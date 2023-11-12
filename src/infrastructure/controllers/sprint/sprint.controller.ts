import { GenericFactory } from '@/infrastructure/mapper/generic.factory';
import { ISprintUseCases } from '@/use-cases/sprint/sprint.use-cases.interface';
import {
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ControllerBase } from '../base.controller';
import { SprintState } from '@/domain/enums/sprint-state.enum';

@Controller('sprint')
@ApiBearerAuth()
@ApiTags('sprint')
export class SprintsController extends ControllerBase {
  constructor(
    @Inject('ISprintUseCases')
    private readonly sprintUseCases: ISprintUseCases,
  ) {
    super();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Sprint by Id' })
  async getSprintById(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: any,
  ) {
    return await this.sprintUseCases.getSprintByIdFromJira(
      this.getCloudId(request),
      this.getAccessToken(request),
      id,
    );
  }
}
