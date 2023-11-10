import { UseCasesModule } from '@/use-cases/use-cases.module';
import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UsersController } from './users/users.controller';
import { GenericFactory } from '../mapper/generic.factory';
import { UserMapperProfile } from './users/user.mapping.profile';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [UseCasesModule, RepositoriesModule],
  controllers: [UsersController, AuthController],
  providers: [GenericFactory, UserMapperProfile],
})
export class ControllersModule {}
