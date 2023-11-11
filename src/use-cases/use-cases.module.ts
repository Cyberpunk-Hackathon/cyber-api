import { AxiosModule } from '@/infrastructure/common/axios/axios.module';
import { RepositoriesModule } from '@/infrastructure/repositories/repositories.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BoardUseCases } from './board/board.use-cases';
import { IssueUseCases } from './issue/issue.use-cases';
import { ProjectUseCases } from './project/project.use-cases';
import { SprintUseCases } from './sprint/sprint.use-cases';
import { UserUseCases } from './user/user.use-cases';

@Module({
  imports: [RepositoriesModule, HttpModule, AxiosModule],
  providers: [
    {
      provide: 'IUserUseCases',
      useClass: UserUseCases,
    },
    {
      provide: 'IProjectUseCases',
      useClass: ProjectUseCases,
    },
    {
      provide: 'IBoardUseCases',
      useClass: BoardUseCases,
    },
    {
      provide: 'ISprintUseCases',
      useClass: SprintUseCases,
    },
    {
      provide: 'IIssueUseCases',
      useClass: IssueUseCases,
    },
  ],
  exports: [
    'IUserUseCases',
    'IProjectUseCases',
    'IBoardUseCases',
    'ISprintUseCases',
    'IIssueUseCases',
  ],
})
export class UseCasesModule {}
