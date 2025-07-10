import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Question, QuestionSchema } from './Question.schema';
import { FormSubmission, FormSubmissionSchema } from './FormSubmission.schema';

export type FormsDocument = HydratedDocument<Forms>;
@Schema()
export class Forms {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true, unique: true })
  formId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  createdBy: mongoose.Types.ObjectId;

  @Prop({ required: true })
  createdAt?: number;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: [QuestionSchema], default: [] })
  questions: Question[];

  @Prop({ type: [FormSubmissionSchema], default: [] })
  responses: FormSubmission[];

  @Prop()
  deadline?: Date;

  @Prop({ default: true })
  isActive: boolean;
}

export const FormsSchema = SchemaFactory.createForClass(Forms);
