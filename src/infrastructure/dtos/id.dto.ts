import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class IdDto {
  @IsInt()
  @AutoMap()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({
    description: 'Id',
    example: 1,
  })
  @Type(() => Number)
  public readonly id: number;
}
