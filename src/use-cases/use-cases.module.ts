import { RepositoriesModule } from '@/infrastructure/repositories/repositories.module';
import { UserUseCases } from './user/user.use-cases';
import { Module } from '@nestjs/common';

@Module({
  imports: [RepositoriesModule],
  providers: [
    {
      provide: 'IUserUseCases',
      useClass: UserUseCases,
    },
  ],
  exports: ['IUserUseCases'],
})
export class UseCasesModule {}
