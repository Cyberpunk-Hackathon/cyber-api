import { Injectable } from '@nestjs/common';
import { IPredictUseCases } from './predict.use-cases.interface';
import { Predict } from '@/domain/models/predict';

@Injectable()
export class PredictUseCases implements IPredictUseCases {
  predict(predict: Predict): Promise<void> {
    console.log(predict);

    throw new Error('Method not implemented.');
  }
}
