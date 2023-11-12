import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from '../entities/user.entity';
import { GenericFactory } from '../mapper/generic.factory';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
  ],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    GenericFactory,
  ],
  exports: ['IUserRepository'],
})
export class RepositoriesModule {}
