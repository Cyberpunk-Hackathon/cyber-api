export interface IGenericUseCases<TModel> {
  create(createDto: TModel): Promise<TModel>;
  findAll(): Promise<TModel[]>;
  findOne(id: string): Promise<TModel>;
  update(id: string, updateDto: TModel): Promise<TModel>;
  remove(id: string): Promise<TModel>;
}
