import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';
import { Questions } from 'src/database/Enum/Questions.enum';

class ValidationDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  length?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  fileSize?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fileTypes?: string[];

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  minDate?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  maxDate?: Date;
}

export class FormDto {
  @IsString()
  formId: string;

  @IsMongoId()
  createdBy: mongoose.Types.ObjectId;

  @IsNumber()
  createdAt: number;

  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];

  @IsOptional()
  @IsDate()
  deadline?: Date;

  @IsBoolean()
  isActive: boolean;
}

export class QuestionDto {
  @IsEnum(Questions)
  type: Questions;

  @IsString()
  title: string;

  @IsBoolean()
  isRequired: boolean;

  @IsString()
  @IsOptional()
  description?: string;

  @ValidateNested()
  @Type(() => ValidationDto)
  @IsOptional()
  validations?: ValidationDto;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  options?: string[];
}
