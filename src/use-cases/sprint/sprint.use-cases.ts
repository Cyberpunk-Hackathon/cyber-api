import { SprintState } from '@/domain/enums/sprint-state.enum';
import { ProcessedData } from '@/domain/models/processed-data';
import { Sprint } from '@/domain/models/sprint';
import { AxiosGetService } from '@/infrastructure/common/axios/get-request.axios';
import { Injectable } from '@nestjs/common';
import { UseCaseBase } from '../use-case.abstract';
import { ISprintUseCases } from './sprint.use-cases.interface';

@Injectable()
export class SprintUseCases
  extends UseCaseBase<Sprint>
  implements ISprintUseCases
{
  constructor(private readonly axiosService: AxiosGetService) {
    super();
  }
  async getSprintByIdFromJira(
    cloudId: string,
    accessToken: string,
    sprintId: number,
  ): Promise<Sprint> {
    const getSprintByIdConfig = {
      url: `https://api.atlassian.com/ex/jira/${cloudId}/rest/agile/1.0/sprint/${sprintId}`,
      method: 'GET',
      headers: {
        Authorization: accessToken,
        Accept: 'application/json',
      },
    };

    return await this.axiosService.axiosRequestOneAndMap<Sprint>(
      getSprintByIdConfig,
      Sprint,
      'excludeAll',
    );
  }

  async getAllSprintsByBoardIdFromJira(
    cloudId: string,
    accessToken: string,
    boardId: number,
    state?: SprintState,
  ): Promise<ProcessedData<Sprint>> {
    const getAllSprintsByBoardIdConfig = {
      url: `https://api.atlassian.com/ex/jira/${cloudId}/rest/agile/1.0/board/${boardId}/sprint${
        state ? `?state=${state}` : ''
      }`,
      method: 'GET',
      headers: {
        Authorization: accessToken,
        Accept: 'application/json',
      },
    };

    return await this.axiosService.axiosRequestManyAndMap<Sprint>(
      getAllSprintsByBoardIdConfig,
      Sprint,
      'excludeAll',
    );
  }

  create(createDto: Sprint): Promise<Sprint> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Sprint[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<Sprint> {
    throw new Error('Method not implemented.');
  }
  update(id: string, updateDto: Sprint): Promise<Sprint> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<Sprint> {
    throw new Error('Method not implemented.');
  }
}
