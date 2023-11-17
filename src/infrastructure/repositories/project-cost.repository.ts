import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectCostEntity } from '../entities/project.entity';
import { RepositoryBase } from './repository.abstract';

@Injectable()
export class ProjectCostRepository extends RepositoryBase<ProjectCostEntity> {
  constructor(
    @InjectModel(ProjectCostEntity.name)
    private projectCostModel: Model<ProjectCostEntity>,
  ) {
    super();
  }

  async createOne(
    projectId: string,
    sprintId: string,
    currency: number,
  ): Promise<ProjectCostEntity> {
    const created = await this.projectCostModel.create({
      projectId,
      sprintId,
      currency,
    });
    return created as ProjectCostEntity;
  }

  async findOneByProjectId(
    projectId: string,
    sprintId: string,
  ): Promise<ProjectCostEntity> {
    const project = await this.projectCostModel.findOne({
      projectId,
      sprintId,
    });
    return project as ProjectCostEntity;
  }

  async updateOne(
    projectId: string,
    sprintId: string,
    currency: number,
  ): Promise<ProjectCostEntity> {
    const project = await this.projectCostModel.findOneAndUpdate(
      { projectId, sprintId },
      { currency },
    );
    return project as ProjectCostEntity;
  }

  update(id: string, updateDto: ProjectCostEntity): Promise<ProjectCostEntity> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<ProjectCostEntity[]> {
    throw new Error('Method not implemented.');
  }

  findOne(id: string): Promise<ProjectCostEntity> {
    throw new Error('Method not implemented.');
  }

  create(createDto: ProjectCostEntity): Promise<ProjectCostEntity> {
    throw new Error('Method not implemented.');
  }

  remove(id: string): Promise<ProjectCostEntity> {
    throw new Error('Method not implemented.');
  }
}
