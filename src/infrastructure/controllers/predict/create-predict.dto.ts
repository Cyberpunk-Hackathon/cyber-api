import { ComplexityEnum } from '@/domain/enums/complexity.enum';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePredictDto {
  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User story',
    example: 'As a user, I want to be able to create a new account',
  })
  readonly userStory: string;

  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Acceptance criteria',
    example:
      'Given a user is on the login page, when the user enters valid credentials, then the user is logged in',
  })
  readonly acceptanceCriteria: string;

  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Project Id',
    example: '60d4a3a1f4a0f40015d9d7c2',
  })
  readonly projectId: string;

  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Sprint Id',
    example: '60d4a3a1f4a0f40015d9d7c2',
  })
  readonly sprintId: string;

  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Issue Id',
    example: '1',
  })
  readonly issueId: string;

  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Backend Technology',
    example: 'NestJS',
  })
  readonly backendTechnology: string;

  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Frontend Technology',
    example: 'ReactJS',
  })
  readonly frontendTechnology: string;

  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Complexity',
    example: ComplexityEnum.High,
    type: 'enum',
  })
  readonly complexity: ComplexityEnum;

  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Story point to hour ratio',
    example: '1 : 4',
  })
  readonly storyPointToHourRatio: string;
}
