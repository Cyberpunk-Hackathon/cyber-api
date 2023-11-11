import { AutoMap } from '@automapper/classes';
import { Expose } from 'class-transformer';

export class Board {
  @AutoMap()
  @Expose()
  public id: number;

  @AutoMap()
  @Expose()
  public name: string;

  @AutoMap()
  @Expose()
  public type: string;
}
