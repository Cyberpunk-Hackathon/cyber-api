import { ComplexityEnum } from '@/domain/enums/complexity.enum';
import { AutoMap } from '@automapper/classes';

export class Predict {
  @AutoMap()
  readonly userStory: string;

  @AutoMap()
  readonly acceptanceCriteria: string;

  @AutoMap()
  readonly projectId: string;

  @AutoMap()
  readonly sprintId: string;

  @AutoMap()
  readonly issueId: string;

  @AutoMap()
  readonly backendTechnology: string;

  @AutoMap()
  readonly frontendTechnology: string;

  @AutoMap()
  readonly complexity: ComplexityEnum;

  @AutoMap()
  readonly storyPointToHourRatio: string;
}
