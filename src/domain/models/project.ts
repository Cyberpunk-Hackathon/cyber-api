import { AutoMap } from '@automapper/classes';
import { Expose, Transform } from 'class-transformer';

export class Project {
  @AutoMap()
  @Expose()
  @Transform(({ value }) => parseInt(value, 10))
  public id: number;

  @AutoMap()
  @Expose()
  public name: string;

  @AutoMap()
  @Expose()
  public key: string;

  @AutoMap()
  @Expose()
  public description: string;

  @AutoMap()
  @Expose()
  public projectTypeKey: string;
}
