import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProjectCostDocument = HydratedDocument<ProjectCostEntity>;

@Schema()
export class ProjectCostEntity {
  @Prop()
  projectId: string;

  @Prop()
  sprintId: string;

  @Prop()
  currency: number;
}

export const ProjectCostSchema = SchemaFactory.createForClass(ProjectCostEntity);
