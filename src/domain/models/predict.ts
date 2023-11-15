import { ComplexityEnum } from '@/domain/enums/complexity.enum';
import { AutoMap } from '@automapper/classes';

export class Predict {
  @AutoMap()
  readonly userStory: string;

  @AutoMap()
  readonly acceptanceCriteria: string;

  @AutoMap()
  readonly complexity: ComplexityEnum;
}
