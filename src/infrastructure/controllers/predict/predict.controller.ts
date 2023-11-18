import { IPredictUseCases } from '@/use-cases/predict/predict.use-cases.interface';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ControllerBase } from '../base.controller';
import { CreatePredictDto } from './create-predict.dto';
import { GenericFactory } from '@/infrastructure/mapper/generic.factory';
import { Predict } from '@/domain/models/predict';

@Controller('predict')
@ApiBearerAuth()
@ApiTags('predict')
export class PredictController extends ControllerBase {
  constructor(
    @Inject('IPredictUseCases')
    private readonly predictUseCases: IPredictUseCases,
    private readonly factory: GenericFactory,
  ) {
    super();
  }

  @Post()
  @ApiOperation({ summary: 'Prediction' })
  async predict(@Body() createPredictDto: CreatePredictDto) {
    const predict = this.factory.mapFromTo<CreatePredictDto, Predict>(
      createPredictDto,
      CreatePredictDto,
      Predict,
    );
    return await this.predictUseCases.predict(predict);
  }
}
