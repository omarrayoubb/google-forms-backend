import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
class AnswerDto {
  @ApiProperty({ description: 'Question choices' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  options_answer?: string[];

  @ApiProperty({ description: 'Answer text' })
  @IsString()
  @IsOptional()
  answerText?: string;

  @ApiProperty({ description: 'Question ID' })
  @IsMongoId()
  QID: mongoose.Types.ObjectId;

  @ApiProperty({ description: 'Uploaded file name' })
  @IsString()
  @IsOptional()
  uploadedFileName?: string;

  @ApiProperty({ description: 'Uploaded file path' })
  @IsString()
  @IsOptional()
  uploadedFilePath?: string;

  @ApiProperty({ description: 'Uploaded file type' })
  @IsString()
  @IsOptional()
  uploadedFileType?: string;
}

export class SubmissionDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  @ApiProperty({ description: 'User answers on ther form' })
  userAnswers: AnswerDto[];
}
