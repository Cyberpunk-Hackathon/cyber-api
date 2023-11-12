import { Injectable } from '@nestjs/common';
import { RepositoryBase } from './repository.abstract';
import { User } from '@/domain/models/user';
import { UserEntity } from '../entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository extends RepositoryBase<User> {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
  ) {
    super();
  }

  async create(createDto: User): Promise<User> {
    const createdUser = new this.userModel(createDto);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
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
