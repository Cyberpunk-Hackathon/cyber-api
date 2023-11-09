import { IUserUseCases } from '@/use-cases/user/user.use-cases.interface';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { User } from '@/domain/models/user';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GenericFactory } from '@/infrastructure/mapper/generic.factory';
import { ControllerBase } from '../base.controller';

@Controller('users')
@ApiBearerAuth()
@ApiTags('users')
export class UsersController extends ControllerBase {
  constructor(
    @Inject('IUserUseCases')
    private readonly userUseCases: IUserUseCases,
    private readonly factory: GenericFactory,
  ) {
    super();
  }

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
