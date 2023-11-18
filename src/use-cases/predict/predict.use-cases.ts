import { Predict } from '@/domain/models/predict';
import { ProjectCostRepository } from '@/infrastructure/repositories/project-cost.repository';
import { Inject, Injectable } from '@nestjs/common';
import { IPredictUseCases } from './predict.use-cases.interface';
import { AxiosPostService } from '@/infrastructure/common/axios/post-reqest.axios';
import { IssuePredictionEntity } from '@/infrastructure/entities/issue-prediction.entity';
import { IssuePredictionRepository } from '@/infrastructure/repositories/issue-prediction.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PredictUseCases implements IPredictUseCases {
  constructor(
    @Inject('IProjectCostRepository')
    private readonly projectCostRepository: ProjectCostRepository,
    private readonly issuePredictionRepository: IssuePredictionRepository,
    private readonly axiosPostService: AxiosPostService,
    private readonly configService: ConfigService,
  ) {}

  async predict(predict: Predict): Promise<any> {
    console.log(predict);
    //TODO Django API
    try {
      // const postResponse: any = [
      //   [
      //     'text',
      //     [
      //       ['annotations', []],
      //       [
      //         'value',
      //         '{ \n    "optimisticEstimation" : {\n        "developmentEstimate": "16 hours", \n        "qaEstimate": "8 hours" \n    },\n    "pessimisticEstimation" : {\n        "developmentEstimate": "24 hours", \n        "qaEstimate": "12 hours" \n    },\n    "realisticEstimation" : {\n        "developmentEstimate": "20 hours", \n        "qaEstimate": "10 hours" \n    },\n    "testCases" : [\n        "Verify that the admin dashboard has a dedicated section for displaying weekly statistics",\n        "Verify that the weekly statistics are presented in square tabs",\n        "Verify that the metrics: number of tasks started, number of tasks completed, number of drop-offs or abandoned tasks, average completion time (in minutes), average feedback score for completed tasks are displayed for each week",\n        "Verify that the metrics are compared with the previous week",\n        "Verify that there is an option to show more details for the average completion time and average feedback score",\n        "Verify that the data is grouped by week and is automatically refreshed at the start of the week",\n        "Verify that the weekly statistics are responsive and display well on different devices and screen sizes"\n    ], \n    "additionalNotes" : "The complexity level of this task is medium as it involves creating a dedicated section, displaying metrics, grouping data, and making it responsive."\n}',
      //       ],
      //     ],
      //   ],
      //   ['type', 'text'],
      //   ['price', 0.002007],
      // ];

      //await this.axiosPostService.post(predict);

      // const prediction = JSON.parse(postResponse[0][1][1][1]);
      // const price = postResponse.find(
      //   (item: string[]) => item[0] === 'price',
      // )[1];

      //TODO : Remove this sample response
      const sampleResponse =
        '{\n    "optimisticEstimation": {\n        "developmentEstimate": 40,\n        "qaEstimate": 20\n    },\n    "pessimisticEstimation": {\n        "developmentEstimate": 80,\n        "qaEstimate": 40\n    },\n    "realisticEstimation": {\n        "developmentEstimate": 60,\n        "qaEstimate": 30\n    }\n}';
      const url = `${this.configService.getOrThrow('MODEL_BASE_URL')}/predict`;
      const postResponse =
        (await this.axiosPostService.post(url, predict)) ?? sampleResponse;
      const prediction = JSON.parse(postResponse);
      const allEstimations = new Estimates();
      const price = 0.0;
      allEstimations.optimisticEstimation = prediction.optimisticEstimation;
      allEstimations.pessimisticEstimation = prediction.pessimisticEstimation;
      allEstimations.realisticEstimation = prediction.realisticEstimation;

      const estimation = this.calculateEstimate(allEstimations);

      const issuePrediction = new IssuePredictionEntity();
      (issuePrediction.projectId = parseInt(predict.projectId)),
        (issuePrediction.sprintId = parseInt(predict.sprintId)),
        (issuePrediction.issueId = parseInt(predict.issueId)),
        (issuePrediction.estimation = estimation),
        (issuePrediction.testCases = JSON.stringify(prediction.testCases)),
        (issuePrediction.additionalNotes = prediction.additionalNotes),
        (issuePrediction.price = price || 0.0);

      console.log(issuePrediction);

      const newIssuePredictionRecord =
        await this.issuePredictionRepository.createOne(issuePrediction);

      const existingRecord =
        await this.projectCostRepository.findOneByProjectId(
          predict.projectId,
          predict.sprintId,
        );

      if (existingRecord) {
        await this.projectCostRepository.updateOne(
          predict.projectId,
          predict.sprintId,
          existingRecord.currency + price,
        );
        return issuePrediction;
      }

      await this.projectCostRepository.createOne(
        predict.projectId,
        predict.sprintId,
        price,
      );

      return issuePrediction;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  private calculateEstimate(estimates: Estimates): number {
    let totalOptimisticEstimationInHours: number = this.prepareSingleEstimation(
      estimates.optimisticEstimation,
    );
    let totalPessimisticEstimationInHours: number =
      this.prepareSingleEstimation(estimates.pessimisticEstimation);
    let totalRealisticEstimationInHours: number = this.prepareSingleEstimation(
      estimates.realisticEstimation,
    );

    // PERT Estimation Calculation
    // This returns an average estimation
    let pertEstimation: number =
      (totalOptimisticEstimationInHours +
        4 * totalRealisticEstimationInHours +
        totalPessimisticEstimationInHours) /
      6;

    return pertEstimation;
  }

  private parseEstimation(estimation: Estimation): Estimation {
    estimation.developmentEstimate = this.parseNumericString(
      estimation.developmentEstimate,
    );
    estimation.qaEstimate = this.parseNumericString(estimation.qaEstimate);

    return estimation;
  }

  private parseNumericString(value: string | number): number {
    return typeof value === 'string' ? parseInt(value) : (value as number);
  }

  private prepareSingleEstimation(estimation: Estimation): number {
    const parsedEstimation = this.parseEstimation(estimation);
    const developmentEstimate = this.ensureNumber(
      parsedEstimation.developmentEstimate,
    );
    const qaEstimate = this.ensureNumber(parsedEstimation.qaEstimate);

    return developmentEstimate + qaEstimate;
  }

  private ensureNumber(value: string | number): number {
    return typeof value === 'string' ? parseInt(value) : (value as number);
  }
}

class Estimates {
  optimisticEstimation: Estimation;
  pessimisticEstimation: Estimation;
  realisticEstimation: Estimation;
}

interface Estimation {
  developmentEstimate: string | number;
  qaEstimate: string | number;
}
