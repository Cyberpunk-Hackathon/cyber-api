import { User } from '@/domain/models/user';
import { IGenericUseCases } from '../use-case.interface';

export interface IUserUseCases extends IGenericUseCases<User> {
    
}