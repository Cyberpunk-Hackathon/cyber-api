import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectEntity, ProjectCostSchema } from '../entities/project.entity';
import { UserEntity, UserSchema } from '../entities/user.entity';
import { GenericFactory } from '../mapper/generic.factory';
import { ProjectCostRepository } from './project-cost.repository';
import { UserRepository } from './user.repository';
import { IssuePredictionRepository } from './issue-prediction.repository';
import { IssuePredictionEntity, IssueSchema } from '../entities/issue-prediction.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: ProjectEntity.name, schema: ProjectCostSchema },
    ]),
    MongooseModule.forFeature([
      { name: IssuePredictionEntity.name, schema: IssueSchema },
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
    IssuePredictionRepository,
    GenericFactory,
  ],
  exports: [
    'IUserRepository',
    'IProjectCostRepository',
    IssuePredictionRepository,
  ],
})
export class RepositoriesModule {}
