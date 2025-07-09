import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { FormAnswer, FormAnswerSchema } from './FormAnswer.schema';
@Schema()
export class FormSubmission {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  userID: mongoose.Types.ObjectId;

  @Prop({ type: [FormAnswerSchema], required: true })
  userAnswers: FormAnswer[];
  @Prop()
  SubmissionTime: Date;
}
export const FormSubmissionSchema =
  SchemaFactory.createForClass(FormSubmission);
