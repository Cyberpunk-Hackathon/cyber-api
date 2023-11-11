import { SprintState } from '@/domain/enums/sprint-state.enum';
import { ProcessedData } from '@/domain/models/processed-data';
import { Sprint } from '@/domain/models/sprint';
import { IGenericUseCases } from '../use-case.interface';

export interface ISprintUseCases extends IGenericUseCases<Sprint> {
  getAllSprintsByBoardIdFromJira(
    cloudId: string,
    accessToken: string,
    boardId: number,
    state?: SprintState,
  ): Promise<ProcessedData<Sprint>>;
  getSprintByIdFromJira(
    cloudId: string,
    accessToken: string,
    sprintId: number,
  ): Promise<Sprint>;
}
