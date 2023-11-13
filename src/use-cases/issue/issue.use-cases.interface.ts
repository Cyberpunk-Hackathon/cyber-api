import { Issue } from '@/domain/models/issue';
import { ProcessedData } from '@/domain/models/processed-data';
import { IGenericUseCases } from '../use-case.interface';

export interface IIssueUseCases extends IGenericUseCases<Issue> {
  getIssuesBySprintIdFromJira(
    cloudId: string,
    accessToken: string,
    sprintId: number,
  ): Promise<ProcessedData<Issue>>;
  getBoardIssuesBySprintIdFromJira(
    cloudId: string,
    accessToken: string,
    boardId: number,
    sprintId: number,
    startAt?: number,
    maxResults?: number,
  ): Promise<ProcessedData<Issue>>;
  getIssueByIdFromJira(
    cloudId: string,
    accessToken: string,
    issueKey?: number | string,
  ): Promise<Issue>;
  getIssueEstimationByIdFromJira(
    cloudId: string,
    accessToken: string,
    boardId: number,
    issueKey: number | string,
  ): Promise<object>;
  getBacklogIssuesByBoardIdFromJira(
    cloudId: string,
    accessToken: string,
    boardId: number,
    startAt?: number,
    maxResults?: number,
  ): Promise<ProcessedData<Issue>>;
}
