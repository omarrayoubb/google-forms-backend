import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
@Schema()
export class FormAnswer {
  @Prop({ type: [String] })
  options_answer?: string[];

  @Prop()
  answerText?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  QID: mongoose.Types.ObjectId;

  @Prop()
  uploadedFileName?: string;

  @Prop()
  uploadedFilePath?: string;

  @Prop()
  uploadedFileType?: string;
}
export const FormAnswerSchema = SchemaFactory.createForClass(FormAnswer);
