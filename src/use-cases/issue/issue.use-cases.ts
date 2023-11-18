import { Issue } from '@/domain/models/issue';
import { ProcessedData } from '@/domain/models/processed-data';
import { AxiosGetService } from '@/infrastructure/common/axios/get-request.axios';
import { Injectable } from '@nestjs/common';
import { UseCaseBase } from '../use-case.abstract';
import { IIssueUseCases } from './issue.use-cases.interface';
import { AxiosPostService } from '@/infrastructure/common/axios/post-reqest.axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IssueUseCases
  extends UseCaseBase<Issue>
  implements IIssueUseCases
{
  constructor(
    private readonly configService: ConfigService,
    private readonly axiosGetService: AxiosGetService,
    private readonly axiosPostService: AxiosPostService,
  ) {
    super();
  }
  async getBacklogIssuesByBoardIdFromJira(
    cloudId: string,
    accessToken: string,
    boardId: number,
    startAt = 0,
    maxResults = 50,
  ): Promise<ProcessedData<Issue>> {
    const fields =
      'summary,description,priority,timeestimate,status,creator,timetracking,created';
    const getBoardsByProjectsConfig = {
      url: `https://api.atlassian.com/ex/jira/${cloudId}/rest/agile/1.0/board/${boardId}/backlog?fields=${fields}&jql=issuetype=Story${
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

    return await this.axiosGetService.axiosRequestManyAndMap<Issue>(
      getBoardsByProjectsConfig,
      Issue,
      'exposeAll',
    );
  }

  async getIssueEstimationByIdFromJira(
    cloudId: string,
    accessToken: string,
    boardId: number,
    issueKey: string | number,
  ): Promise<Object> {
    const getBoardsByProjectsConfig = {
      url: `https://api.atlassian.com/ex/jira/${cloudId}/rest/agile/1.0/issue/${issueKey}/estimation?boardId=${boardId}`,
      method: 'GET',
      headers: {
        Authorization: accessToken,
        Accept: 'application/json',
      },
    };

    const estimation = await this.axiosGetService.axiosRequestOne(
      getBoardsByProjectsConfig,
    );

    const responseBody = {
      boardId,
      issueKey,
      estimation,
    };

    return responseBody;
  }
  async getIssuesBySprintIdFromJira(
    cloudId: string,
    accessToken: string,
    sprintId: number,
  ): Promise<ProcessedData<Issue>> {
    const fields =
      'summary,description,priority,timeestimate,status,creator,timetracking,created';
    const getBoardsByProjectsConfig = {
      url: `https://api.atlassian.com/ex/jira/${cloudId}/rest/agile/1.0/sprint/${sprintId}/issue?fields=${fields}&jql=issuetype=Story`,
      method: 'GET',
      headers: {
        Authorization: accessToken,
        Accept: 'application/json',
      },
    };

    return await this.axiosGetService.axiosRequestManyAndMap<Issue>(
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
    const fields =
      'summary,description,priority,timeestimate,status,creator,timetracking,created';
    const getBoardsByProjectsConfig = {
      url: `https://api.atlassian.com/ex/jira/${cloudId}/rest/agile/1.0/board/${boardId}/sprint/${sprintId}/issue?fields=${fields}&jql=issuetype=Story${
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

    return await this.axiosGetService.axiosRequestManyAndMap<Issue>(
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
    try {
      const getBoardByIdConfig = {
        url: `https://api.atlassian.com/ex/jira/${cloudId}/rest/agile/1.0/issue/${issueIdOrKey}`,
        method: 'GET',
        headers: {
          Authorization: accessToken,
          Accept: 'application/json',
        },
      };
      const issue = await this.axiosGetService.axiosRequestOneAndMap<Issue>(
        getBoardByIdConfig,
        Issue,
        'exposeAll',
      );

      const similarStories: any[] = await this.getSimilarIssues(
        issue.fields.summary,
      );

      issue.similarStories = similarStories && similarStories.length > 0 ? similarStories : [];
      return issue;
    } catch (error) {
      throw error;
    }
  }

  private async getSimilarIssues(storyTitle: string): Promise<any[]> {
    try {
      const url = `${this.configService.getOrThrow('MODEL_BASE_URL')}/query`;
      //'http://localhost:8000/api/query';
      const similarIssues = await this.axiosPostService.post(url, {
        query_text: storyTitle,
      });

      return similarIssues;
    } catch (error) {
      throw error;
    }
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
