import { Board } from '@/domain/models/board';
import { IGenericUseCases } from '../use-case.interface';
import { ProcessedData } from '@/domain/models/processed-data';

export interface IBoardUseCases extends IGenericUseCases<Board> {
  getBoardsFromJira(
    cloudId: string,
    accessToken: string,
    projectKey?: number | string,
  ): Promise<ProcessedData<Board>>;
  getBoardByIdFromJira(
    boardId: number,
    cloudId: string,
    accessToken: string,
  ): Promise<Board>;
}
