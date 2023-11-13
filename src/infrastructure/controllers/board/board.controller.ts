import { SprintState } from '@/domain/enums/sprint-state.enum';
import { IdDto } from '@/infrastructure/dtos/id.dto';
import { IBoardUseCases } from '@/use-cases/board/board.use-cases.interface';
import { IIssueUseCases } from '@/use-cases/issue/issue.use-cases.interface';
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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ControllerBase } from '../base.controller';

@Controller('board')
@ApiBearerAuth()
@ApiTags('board')
export class BoardsController extends ControllerBase {
  constructor(
    @Inject('IBoardUseCases')
    private readonly boardUseCases: IBoardUseCases,
    @Inject('ISprintUseCases')
    private readonly sprintUseCases: ISprintUseCases,
    @Inject('IIssueUseCases')
    private readonly issueUseCases: IIssueUseCases,
  ) {
    super();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get board by Id' })
  async getProjectById(@Param() idDto: IdDto, @Req() request: any) {
    return await this.boardUseCases.getBoardByIdFromJira(
      idDto.id,
      this.getCloudId(request),
      this.getAccessToken(request),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get All Boards or Get board by Project ID or Key' })
  @ApiQuery({
    name: 'projectKey',
    description: 'Project Key',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'projectId',
    description: 'Project Id',
    required: false,
    type: String,
  })
  async getProjectsByKeyOrId(
    @Req() request: any,
    @Query('projectKey') projectKey?: string,
    @Query('projectId') projectId?: string,
  ) {
    const parsedProjectId = projectId ? parseInt(projectId, 10) : undefined;
    return await this.boardUseCases.getBoardsFromJira(
      this.getCloudId(request),
      this.getAccessToken(request),
      projectKey || parsedProjectId,
    );
  }

  @Get(':boardId/sprint')
  @ApiOperation({ summary: 'Get All Sprints by Board Id' })
  @ApiQuery({
    name: 'state',
    description: 'state of the sprints',
    required: false,
    type: String,
  })
  async getSprintByBoardId(
    @Req() request: any,
    @Param('boardId', ParseIntPipe) boardId: number,
    @Query('state') state: SprintState,
  ) {
    return await this.sprintUseCases.getAllSprintsByBoardIdFromJira(
      this.getCloudId(request),
      this.getAccessToken(request),
      boardId,
      state,
    );
  }

  @Get(':boardId/sprint/:sprintId/issue')
  @ApiOperation({ summary: 'Get All Issues of a Board by Sprint Id' })
  @ApiQuery({
    name: 'startAt',
    description: 'Start At',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'maxResults',
    description: 'Max Results',
    required: false,
    type: Number,
  })
  async getBoardIssuesBySprintId(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Param('sprintId', ParseIntPipe) sprintId: number,
    @Query('startAt') startAt: string,
    @Query('maxResults') maxResults: string,
    @Req() request: any,
  ) {
    const parsedStartAt = startAt ? parseInt(startAt, 10) : undefined;
    const parsedMaxResults = maxResults ? parseInt(maxResults, 10) : undefined;
    return await this.issueUseCases.getBoardIssuesBySprintIdFromJira(
      this.getCloudId(request),
      this.getAccessToken(request),
      boardId,
      sprintId,
      parsedStartAt,
      parsedMaxResults,
    );
  }
  @Get(':boardId/backlog')
  @ApiOperation({ summary: 'Get All Backlog Issues of a Board by Board Id' })
  @ApiQuery({
    name: 'startAt',
    description: 'Start At',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'maxResults',
    description: 'Max Results',
    required: false,
    type: Number,
  })
  async getBacklogIssuesByBoardId(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Query('startAt') startAt: string,
    @Query('maxResults') maxResults: string,
    @Req() request: any,
  ) {
    const parsedStartAt = startAt ? parseInt(startAt, 10) : undefined;
    const parsedMaxResults = maxResults ? parseInt(maxResults, 10) : undefined;
    return await this.issueUseCases.getBacklogIssuesByBoardIdFromJira(
      this.getCloudId(request),
      this.getAccessToken(request),
      boardId,
      parsedStartAt,
      parsedMaxResults,
    );
  }
}
