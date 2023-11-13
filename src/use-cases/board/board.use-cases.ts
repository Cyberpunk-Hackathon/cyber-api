import { Board } from '@/domain/models/board';
import { ProcessedData } from '@/domain/models/processed-data';
import { AxiosGetService } from '@/infrastructure/common/axios/get-request.axios';
import { Injectable } from '@nestjs/common';
import { UseCaseBase } from '../use-case.abstract';
import { IBoardUseCases } from './board.use-cases.interface';

@Injectable()
export class BoardUseCases
  extends UseCaseBase<Board>
  implements IBoardUseCases
{
  constructor(private readonly axiosService: AxiosGetService) {
    super();
  }
  async getBoardsFromJira(
    cloudId: string,
    accessToken: string,
    projectKey?: number | string | undefined,
  ): Promise<ProcessedData<Board>> {
    const getBoardsByProjectsConfig = {
      url: `https://api.atlassian.com/ex/jira/${cloudId}/rest/agile/1.0/board${
        projectKey !== undefined ? `?projectKeyOrId=${projectKey}` : ''
      }`,
      method: 'GET',
      headers: {
        Authorization: accessToken,
        Accept: 'application/json',
      },
    };

    return await this.axiosService.axiosRequestMany<Board>(
      getBoardsByProjectsConfig,
      Board,
      'excludeAll',
    );
  }

  async getBoardByIdFromJira(
    boardId: number,
    cloudId: string,
    accessToken: string,
  ): Promise<Board> {
    const getBoardByIdConfig = {
      url: `https://api.atlassian.com/ex/jira/${cloudId}/rest/agile/1.0/board/${boardId}`,
      method: 'GET',
      headers: {
        Authorization: accessToken,
        Accept: 'application/json',
      },
    };

    return await this.axiosService.axiosRequestOne<Board>(
      getBoardByIdConfig,
      Board,
      'excludeAll',
    );
  }
  create(createDto: Board): Promise<Board> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Board[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<Board> {
    throw new Error('Method not implemented.');
  }
  update(id: string, updateDto: Board): Promise<Board> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<Board> {
    throw new Error('Method not implemented.');
  }
}
