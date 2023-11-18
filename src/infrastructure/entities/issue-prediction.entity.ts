import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProjectCostDocument = HydratedDocument<IssuePredictionEntity>;

@Schema()
export class IssuePredictionEntity {
  @Prop()
  projectId: number;

  @Prop()
  sprintId: number;

  @Prop()
  issueId: number;

  @Prop()
  estimation: number;

  @Prop()
  additionalNotes: string;

  @Prop()
  testCases: string;

  @Prop()
  price: number;
}

export const IssueSchema = SchemaFactory.createForClass(IssuePredictionEntity);
