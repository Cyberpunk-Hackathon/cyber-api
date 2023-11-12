import { AutoMap } from '@automapper/classes';
import { Expose, Type } from 'class-transformer';
import { SprintState } from '../enums/sprint-state.enum';

export class Sprint {
  @AutoMap()
  @Expose()
  public id: number;

  @AutoMap()
  @Expose()
  public name: string;

  @AutoMap()
  @Expose()
  public state: SprintState;

  @AutoMap()
  @Expose()
  @Type(() => Date)
  public startDate: Date;

  @AutoMap()
  @Expose()
  @Type(() => Date)
  public endDate: Date;

  @AutoMap()
  @Expose()
  @Type(() => Date)
  public createdDate: Date;

  @AutoMap()
  @Expose()
  public originBoardId: number;

  @AutoMap()
  @Expose()
  public goal: string;
}
