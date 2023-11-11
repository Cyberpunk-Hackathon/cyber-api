import { Issue } from '@/domain/models/issue';
import { ProcessedData } from '@/domain/models/processed-data';
import { AxiosGetService } from '@/infrastructure/common/axios/get-request.axios';
import { Injectable } from '@nestjs/common';
import { UseCaseBase } from '../use-case.abstract';
import { IIssueUseCases } from './issue.use-cases.interface';

@Injectable()
export class IssueUseCases
  extends UseCaseBase<Issue>
  implements IIssueUseCases
{
  constructor(private readonly axiosService: AxiosGetService) {
    super();
  }
  async getIssuesBySprintIdFromJira(
    cloudId: string,
    accessToken: string,
    sprintId: number,
  ): Promise<ProcessedData<Issue>> {
    const getBoardsByProjectsConfig = {
      url: `https://api.atlassian.com/ex/jira/${cloudId}/rest/agile/1.0/sprint/${sprintId}/issue'
      }`,
      method: 'GET',
      headers: {
        Authorization: accessToken,
        Accept: 'application/json',
      },
    };

    return await this.axiosService.axiosRequestMany<Issue>(
      getBoardsByProjectsConfig,
      Issue,
      'exposeAll',
    );
  }
  async getBoardIssuesBySprintIdFromJira(
    cloudId: string,
    accessToken: string,
    boardId: number,
    sprintId: number,
    startAt = 0,
    maxResults = 50,
  ): Promise<ProcessedData<Issue>> {
    const fields = 'priority,timeestimate,status,creator,timetracking,created';
    const getBoardsByProjectsConfig = {
      url: `https://api.atlassian.com/ex/jira/${cloudId}/rest/agile/1.0/board/${boardId}/sprint/${sprintId}/issue?fields=${fields}${
        startAt !== null || undefined || isNaN(startAt)
          ? `&startAt=${startAt}`
          : ''
      }${
        maxResults !== null || undefined || isNaN(maxResults)
          ? `&maxResults=${maxResults}`
          : ''
      }`,
      method: 'GET',
      headers: {
        Authorization: accessToken,
        Accept: 'application/json',
      },
    };

    return await this.axiosService.axiosRequestMany<Issue>(
      getBoardsByProjectsConfig,
      Issue,
      'exposeAll',
    );
  }
  async getIssueByIdFromJira(
    cloudId: string,
    accessToken: string,
    issueIdOrKey?: string | number | undefined,
  ): Promise<Issue> {
    const getBoardByIdConfig = {
      url: `https://api.atlassian.com/ex/jira/${cloudId}/rest/agile/1.0/issue/${issueIdOrKey}`,
      method: 'GET',
      headers: {
        Authorization: accessToken,
        Accept: 'application/json',
      },
    };

    return await this.axiosService.axiosRequestOne<Issue>(
      getBoardByIdConfig,
      Issue,
      'exposeAll',
    );
  }
  create(createDto: Issue): Promise<Issue> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Issue[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<Issue> {
    throw new Error('Method not implemented.');
  }
  update(id: string, updateDto: Issue): Promise<Issue> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<Issue> {
    throw new Error('Method not implemented.');
  }
}
