import { RepositoriesModule } from '@/infrastructure/repositories/repositories.module';
import { UserUseCases } from './user/user.use-cases';
import { Module } from '@nestjs/common';
import { AuthUseCases } from './auth/auth.use-cases';

@Module({
  imports: [RepositoriesModule],
  providers: [
    {
      provide: 'IUserUseCases',
      useClass: UserUseCases,
    },
    {
      provide: 'IAuthUseCases',
      useClass: AuthUseCases,
    },
  ],
  exports: ['IUserUseCases', 'IAuthUseCases'],
})
export class UseCasesModule {}
