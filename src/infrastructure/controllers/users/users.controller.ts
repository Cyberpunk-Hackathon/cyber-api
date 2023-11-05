import { IUserUseCases } from '@/use-cases/user/user.use-cases.interface';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { User } from '@/domain/models/user';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GenericFactory } from '@/infrastructure/mapper/generic.factory';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    @Inject('IUserUseCases')
    private readonly userUseCases: IUserUseCases,
    private readonly factory: GenericFactory,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async getAllUsers() {
    return await this.userUseCases.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = this.factory.mapFromTo<CreateUserDto, User>(
      createUserDto,
      CreateUserDto,
      User,
    );
    return await this.userUseCases.create(user);
  }
}
