import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  readonly name: string;
}
