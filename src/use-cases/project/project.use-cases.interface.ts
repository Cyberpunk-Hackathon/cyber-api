import { ProcessedData } from '@/domain/models/processed-data';
import { Project } from '@/domain/models/project';
import { IGenericUseCases } from '../use-case.interface';

export interface IProjectUseCases extends IGenericUseCases<Project> {
  getProjectsFromJira(
    cloudId: string,
    accessToken: string,
  ): Promise<ProcessedData<Project>>;
  getProjectFromJira(
    projectKey: number | string,
    cloudId: string,
    accessToken: string,
  ): Promise<Project>;
}
