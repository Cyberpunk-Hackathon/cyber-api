import {
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { ControllerBase } from '../base.controller';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GenericFactory } from '@/infrastructure/mapper/generic.factory';
import { IProjectUseCases } from '@/use-cases/project/project.use-cases.interface';
import { IdDto } from '@/infrastructure/dtos/id.dto';
import { KeyDto } from '@/infrastructure/dtos/key.dto';

@Controller('project')
@ApiBearerAuth()
@ApiTags('project')
export class ProjectsController extends ControllerBase {
  constructor(
    @Inject('IProjectUseCases')
    private readonly projectUseCases: IProjectUseCases,
    private readonly factory: GenericFactory,
  ) {
    super();
  }

  @Get()
  @ApiOperation({ summary: 'Get All Projects' })
  async getAllProjects(@Req() request: any) {
    return await this.projectUseCases.getProjectsFromJira(
      this.getCloudId(request),
      this.getAccessToken(request),
    );
  }

  @Get(':key')
  @ApiOperation({ summary: 'Get Project by Key' })
  async getProjectByKey(@Param() keyDto: KeyDto, @Req() request: any) {
    return await this.projectUseCases.getProjectFromJira(
      keyDto.key,
      this.getCloudId(request),
      this.getAccessToken(request),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Project by Id' })
  async getProjectById(@Param() idDto: IdDto, @Req() request: any) {
    return await this.projectUseCases.getProjectFromJira(
      idDto.id,
      this.getCloudId(request),
      this.getAccessToken(request),
    );
  }
}
