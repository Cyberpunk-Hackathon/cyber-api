import { Predict } from '@/domain/models/predict';
import { ProjectCostRepository } from '@/infrastructure/repositories/project-cost.repository';
import { Inject, Injectable } from '@nestjs/common';
import { IPredictUseCases } from './predict.use-cases.interface';

@Injectable()
export class PredictUseCases implements IPredictUseCases {
  constructor(
    @Inject('IProjectCostRepository')
    private readonly projectCostRepository: ProjectCostRepository,
  ) {}

  async predict(predict: Predict): Promise<void> {
    console.log(predict);
    //TODO Django API
    const apiCurrency = 50;

    const existingRecord = await this.projectCostRepository.findOneByProjectId(
      predict.projectId,
      predict.sprintId,
    );

    if (existingRecord) {
      await this.projectCostRepository.updateOne(
        predict.projectId,
        predict.sprintId,
        existingRecord.currency + apiCurrency,
      );
      return;
    }

    await this.projectCostRepository.createOne(
      predict.projectId,
      predict.sprintId,
      apiCurrency,
    );

    //TODO
    throw new Error('Method not implemented.');
  }
}
