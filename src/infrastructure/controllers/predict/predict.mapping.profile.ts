import { Predict } from '@/domain/models/predict';
import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreatePredictDto } from './create-predict.dto';

@Injectable()
export class PredictMapperProfile extends AutomapperProfile {
  //@ts-ignore
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CreatePredictDto, Predict);
    };
  }
}
