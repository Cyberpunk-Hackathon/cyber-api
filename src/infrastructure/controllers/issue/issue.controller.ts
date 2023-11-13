import { IIssueUseCases } from '@/use-cases/issue/issue.use-cases.interface';
import { Controller, Get, Inject, Param, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
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
}
