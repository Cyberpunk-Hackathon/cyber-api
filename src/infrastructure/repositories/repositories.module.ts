import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProjectCostEntity,
  ProjectCostSchema,
} from '../entities/project.entity';
import { UserEntity, UserSchema } from '../entities/user.entity';
import { GenericFactory } from '../mapper/generic.factory';
import { ProjectCostRepository } from './project-cost.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: ProjectCostEntity.name, schema: ProjectCostSchema },
    ]),
  ],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IProjectCostRepository',
      useClass: ProjectCostRepository,
    },
    GenericFactory,
  ],
  exports: ['IUserRepository', 'IProjectCostRepository'],
})
export class RepositoriesModule {}
