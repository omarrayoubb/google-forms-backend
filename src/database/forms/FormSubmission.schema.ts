import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { FormAnswer, FormAnswerSchema } from './FormAnswer.schema';
@Schema()
export class FormSubmission {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  userId: mongoose.Types.ObjectId;

  @Prop({ type: [FormAnswerSchema], required: true })
  userAnswers: FormAnswer[];
  @Prop()
  submissionTime: Date;
}
export const FormSubmissionSchema =
  SchemaFactory.createForClass(FormSubmission);
