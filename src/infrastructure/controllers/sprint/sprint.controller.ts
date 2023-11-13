import { ISprintUseCases } from '@/use-cases/sprint/sprint.use-cases.interface';
import {
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ControllerBase } from '../base.controller';
import { IIssueUseCases } from '@/use-cases/issue/issue.use-cases.interface';

@Controller('sprint')
@ApiBearerAuth()
@ApiTags('sprint')
export class SprintsController extends ControllerBase {
  constructor(
    @Inject('ISprintUseCases')
    private readonly sprintUseCases: ISprintUseCases,
    @Inject('IIssueUseCases')
    private readonly issueUseCases: IIssueUseCases,
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
  @Get(':id/issues')
  @ApiOperation({ summary: 'Get Sprint by Id' })
  async getSprintIssuesById(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: any,
  ) {
    return await this.issueUseCases.getIssuesBySprintIdFromJira(
      this.getCloudId(request),
      this.getAccessToken(request),
      id,
    );
  }
}
