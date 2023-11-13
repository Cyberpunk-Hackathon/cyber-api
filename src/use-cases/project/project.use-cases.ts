import { ProcessedData } from '@/domain/models/processed-data';
import { Project } from '@/domain/models/project';
import { AxiosGetService } from '@/infrastructure/common/axios/get-request.axios';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import { UseCaseBase } from '../use-case.abstract';
import { IProjectUseCases } from './project.use-cases.interface';

@Injectable()
export class ProjectUseCases
  extends UseCaseBase<Project>
  implements IProjectUseCases
{
  constructor(
    private readonly httpService: HttpService,
    private readonly axiosService: AxiosGetService,
  ) {
    super();
  }
  async getProjectsFromJira(
    cloudId: string,
    accessToken: string,
  ): Promise<ProcessedData<Project>> {
    const getAllProjectsConfig = {
      url: `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/latest/project`,
      method: 'GET',
      headers: {
        Authorization: accessToken,
        Accept: 'application/json',
      },
    };

    return await this.axiosService.axiosRequestManyAndMap<Project>(
      getAllProjectsConfig,
      Project,
      'excludeAll',
    );
  }

  async getProjectFromJira(
    projectKey: number | string,
    cloudId: string,
    accessToken: string,
  ): Promise<Project> {
    try {
      const axiosResponse: AxiosResponse<Project> = await firstValueFrom(
        this.httpService.get<Project>(
          `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/latest/project/${projectKey}`,
          {
            headers: {
              Authorization: `${accessToken}`,
              Accept: 'application/json',
            },
          },
        ),
      );

      const project = plainToClass(Project, axiosResponse.data, {
        strategy: 'excludeAll',
      });

      return project;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  create(createDto: Project): Promise<Project> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Project[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<Project> {
    throw new Error('Method not implemented.');
  }
  update(id: string, updateDto: Project): Promise<Project> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<Project> {
    throw new Error('Method not implemented.');
  }
}
