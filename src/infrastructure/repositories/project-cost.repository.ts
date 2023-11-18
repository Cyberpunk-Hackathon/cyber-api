import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectEntity } from '../entities/project.entity';
import { RepositoryBase } from './repository.abstract';

@Injectable()
export class ProjectCostRepository extends RepositoryBase<ProjectEntity> {
  constructor(
    @InjectModel(ProjectEntity.name)
    private projectCostModel: Model<ProjectEntity>,
  ) {
    super();
  }

  async createOne(
    projectId: string,
    sprintId: string,
    currency: number,
  ): Promise<ProjectEntity> {
    const created = await this.projectCostModel.create({
      projectId,
      sprintId,
      currency,
    });
    return created as ProjectEntity;
  }

  async findOneByProjectId(
    projectId: string,
    sprintId: string,
  ): Promise<ProjectEntity> {
    const project = await this.projectCostModel.findOne({
      projectId,
      sprintId,
    });
    return project as ProjectEntity;
  }

  async updateOne(
    projectId: string,
    sprintId: string,
    currency: number,
  ): Promise<ProjectEntity> {
    const project = await this.projectCostModel.findOneAndUpdate(
      { projectId, sprintId },
      { currency },
    );
    return project as ProjectEntity;
  }

  update(id: string, updateDto: ProjectEntity): Promise<ProjectEntity> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<ProjectEntity[]> {
    throw new Error('Method not implemented.');
  }

  findOne(id: string): Promise<ProjectEntity> {
    throw new Error('Method not implemented.');
  }

  create(createDto: ProjectEntity): Promise<ProjectEntity> {
    throw new Error('Method not implemented.');
  }

  remove(id: string): Promise<ProjectEntity> {
    throw new Error('Method not implemented.');
  }
}
