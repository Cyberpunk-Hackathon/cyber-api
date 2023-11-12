import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GenericFactory {
  //@ts-ignore
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  mapFromTo<TFrom, UTo>(
    from: TFrom,
    fromType: new () => TFrom,
    toType: new () => UTo,
  ): UTo {
    return this.mapper.map(from, fromType, toType);
  }
}
