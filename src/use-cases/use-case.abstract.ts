import { IGenericUseCases } from './use-case.interface';

export abstract class UseCaseBase<TModel> implements IGenericUseCases<TModel> {
  abstract create(createDto: TModel): Promise<TModel>;
  abstract findAll(): Promise<TModel[]>;
  abstract findOne(id: string): Promise<TModel>;
  abstract update(id: string, updateDto: TModel): Promise<TModel>;
  abstract remove(id: string): Promise<TModel>;
}
