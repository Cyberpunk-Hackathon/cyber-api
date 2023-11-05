export interface IGenericRepository<TEntity> {
  create(createDto: TEntity): Promise<TEntity>;
  findAll(): Promise<TEntity[]>;
  findOne(id: string): Promise<TEntity>;
  update(id: string, updateDto: TEntity): Promise<TEntity>;
  remove(id: string): Promise<TEntity>;
}
