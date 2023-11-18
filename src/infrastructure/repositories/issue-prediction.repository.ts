import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IssuePredictionEntity } from '../entities/issue-prediction.entity';
import { RepositoryBase } from './repository.abstract';

@Injectable()
export class IssuePredictionRepository extends RepositoryBase<IssuePredictionEntity> {
  constructor(
    @InjectModel(IssuePredictionEntity.name)
    private issuePrediction: Model<IssuePredictionEntity>,
  ) {
    super();
  }

  async createOne(
    issuePredictionEntity: IssuePredictionEntity,
  ): Promise<IssuePredictionEntity> {
    const created = await this.issuePrediction.create(issuePredictionEntity);
    return created as IssuePredictionEntity;
  }

  async findOneByIssueId(
    projectId: string,
    sprintId: string,
    issueId: string | number,
  ): Promise<IssuePredictionEntity> {
    const project = await this.issuePrediction.findOne({
      projectId,
      sprintId,
      issueId,
    });
    return project as IssuePredictionEntity;
  }

  async updateOne(
    projectId: string,
    sprintId: string,
    currency: number,
  ): Promise<IssuePredictionEntity> {
    const project = await this.issuePrediction.findOneAndUpdate(
      { projectId, sprintId },
      { currency },
    );
    return project as IssuePredictionEntity;
  }

  update(
    id: string,
    updateDto: IssuePredictionEntity,
  ): Promise<IssuePredictionEntity> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<IssuePredictionEntity[]> {
    throw new Error('Method not implemented.');
  }

  findOne(id: string): Promise<IssuePredictionEntity> {
    throw new Error('Method not implemented.');
  }

  create(createDto: IssuePredictionEntity): Promise<IssuePredictionEntity> {
    throw new Error('Method not implemented.');
  }

  remove(id: string): Promise<IssuePredictionEntity> {
    throw new Error('Method not implemented.');
  }
}
