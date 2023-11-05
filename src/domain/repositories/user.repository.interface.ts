import { User } from '../models/user';
import { IGenericRepository } from './generic.repository.interface';

export interface IUserRepository extends IGenericRepository<User> {}
