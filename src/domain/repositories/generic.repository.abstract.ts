import { IGenericRepository } from './generic.repository.interface';

export abstract class GenericRepositoryBase<TEntity>
  implements IGenericRepository<TEntity>
{
  abstract create(createDto: TEntity): Promise<TEntity>;

  abstract findAll(): Promise<TEntity[]>;

  abstract findOne(id: string): Promise<TEntity>;

  abstract update(id: string, updateDto: TEntity): Promise<TEntity>;

  abstract remove(id: string): Promise<TEntity>;
}
