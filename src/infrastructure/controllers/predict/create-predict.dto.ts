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
    description: 'Complexity',
    example: ComplexityEnum.High,
    type: 'enum',
  })
  readonly complexity: ComplexityEnum;
}
