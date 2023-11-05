import { Inject, Injectable } from '@nestjs/common';
import { UseCaseBase } from '../use-case.abstract';
import { User } from '@/domain/models/user';
import { IUserUseCases } from './user.use-cases.interface';
import { IUserRepository } from '@/domain/repositories/user.repository.interface';

@Injectable()
export class UserUseCases extends UseCaseBase<User> implements IUserUseCases {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {
    super();
  }

  async create(createDto: User): Promise<User> {
    return await this.userRepository.create(createDto);
  }
  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
  findOne(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(id: string, updateDto: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
