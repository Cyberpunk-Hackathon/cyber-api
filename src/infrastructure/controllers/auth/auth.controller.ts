import { Controller, Get, Inject, Query, SetMetadata } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ControllerBase } from '../base.controller';
import { IAuthUseCases } from '@/use-cases/auth/auth.use-cases.interface';

@Controller('auth')
@ApiTags('auth')
@SetMetadata('isPublic', true)
export class AuthController extends ControllerBase {
  constructor(
    @Inject('IAuthUseCases')
    private readonly authUseCases: IAuthUseCases,
  ) {
    super();
  }

  @Get()
  @ApiOperation({ summary: 'Get Jira access token' })
  async getJiraToken(@Query('userId') userId: string) {
    return await this.authUseCases.getJiraToken(userId);
  }
}
