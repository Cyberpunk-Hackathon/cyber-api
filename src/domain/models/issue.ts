import { AutoMap } from '@automapper/classes';
import { Expose } from 'class-transformer';

export class Issue {
  @AutoMap()
  @Expose()
  public id: number;

  @AutoMap()
  @Expose()
  public key: string;

  @AutoMap()
  @Expose()
  public fields: any;
}
