import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Questions } from '../Enum/Questions.enum';
// import mongoose from 'mongoose';
import { Validation, ValidationSchema } from './Validation.schema';

@Schema()
export class Question {
  @Prop({ required: true, type: String, enum: Questions })
  type: Questions;

  @Prop({ required: true })
  title: string;

  @Prop({ default: false })
  isRequired: boolean;

  @Prop()
  description?: string;

  @Prop({ type: ValidationSchema, default: {} })
  validations: Validation;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
