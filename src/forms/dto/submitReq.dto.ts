import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

class AnswerDto {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  options_answer?: string[];

  @IsString()
  @IsOptional()
  answerText?: string;

  @IsMongoId()
  QID: mongoose.Types.ObjectId;

  @IsString()
  @IsOptional()
  uploadedFileName?: string;

  @IsString()
  @IsOptional()
  uploadedFilePath?: string;

  @IsString()
  @IsOptional()
  uploadedFileType?: string;
}

export class SubmissionDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  userAnswers: AnswerDto[];
}
