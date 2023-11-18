import { IIssueUseCases } from '@/use-cases/issue/issue.use-cases.interface';
import {
  Controller,
  Get,
  Inject,
  Param,
  Query,
  Req
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ControllerBase } from '../base.controller';

@Controller('issue')
@ApiBearerAuth()
@ApiTags('issue')
export class IssuesController extends ControllerBase {
  constructor(
    @Inject('IIssueUseCases')
    private readonly issueUseCases: IIssueUseCases,
  ) {
    super();
  }

  @Get(':issueIdOrKey')
  @ApiOperation({ summary: 'Get Issue by Id or Key' })
  @ApiParam({
    name: 'issueIdOrKey',
    required: true,
    type: String || Number,
  })
  async getIssueByIdOrKey(
    @Req() request: any,
    @Param('issueIdOrKey') issueIdOrKey: number | string,
  ) {
    return await this.issueUseCases.getIssueByIdFromJira(
      this.getCloudId(request),
      this.getAccessToken(request),
      issueIdOrKey,
    );
  }

  @Get(':issueIdOrKey/estimation')
  @ApiOperation({ summary: 'Get Issue Estimation by Id or Key with boardId' })
  @ApiParam({
    name: 'issueIdOrKey',
    required: true,
    type: String || Number,
  })
  @ApiQuery({
    name: 'boardId',
    required: true,
    type: Number,
  })
  async getIssueEstimationByIdOrKey(
    @Req() request: any,
    @Param('issueIdOrKey') issueIdOrKey: number | string,
    @Query('boardId') boardId: number,
  ) {
    return await this.issueUseCases.getIssueEstimationByIdFromJira(
      this.getCloudId(request),
      this.getAccessToken(request),
      boardId,
      issueIdOrKey,
    );
  }


}
