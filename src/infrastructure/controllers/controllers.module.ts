import { UseCasesModule } from '@/use-cases/use-cases.module';
import { Module } from '@nestjs/common';
import { GenericFactory } from '../mapper/generic.factory';
import { RepositoriesModule } from '../repositories/repositories.module';
import { BoardsController } from './board/board.controller';
import { ProjectsController } from './project/project.controller';
import { SprintsController } from './sprint/sprint.controller';
import { UserMapperProfile } from './users/user.mapping.profile';
import { UsersController } from './users/users.controller';
import { IssuesController } from './issue/issue.controller';
import { AuthController } from './auth/auth.controller';
import { UploadController } from './upload/upload.controller';
import { PredictController } from './predict/predict.controller';
import { PredictMapperProfile } from './predict/predict.mapping.profile';

@Module({
  imports: [UseCasesModule, RepositoriesModule],
  controllers: [
    UsersController,
    ProjectsController,
    BoardsController,
    SprintsController,
    IssuesController,
    AuthController,
    UploadController,
    PredictController,
  ],

  providers: [GenericFactory, UserMapperProfile, PredictMapperProfile],
})
export class ControllersModule {}
