import { Predict } from "@/domain/models/predict";

export interface IPredictUseCases {
  predict(predict: Predict): Promise<any>;
}
