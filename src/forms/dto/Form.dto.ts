import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ description: 'length constranint of answer of the question' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  length?: number;

  @ApiProperty({ description: 'file size constraint' })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  fileSize?: number;

  @ApiProperty({ description: 'file types constraint' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fileTypes?: string[];

  @ApiProperty({ description: 'min date constraint' })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  minDate?: Date;

  @ApiProperty({ description: 'max date constraint' })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  maxDate?: Date;
}
export class FormDto {
  @ApiProperty({ description: 'form id' })
  @IsString()
  formId: string;

  @ApiProperty({ description: 'created by' })
  @IsMongoId()
  createdBy: mongoose.Types.ObjectId;
  @ApiProperty({ description: 'created at' })
  @IsNumber()
  createdAt: number;
  @ApiProperty({ description: 'title of the Question' })
  @IsString()
  title: string;
  @ApiProperty({ description: 'Optional Description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'questions sent to the form' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];

  @ApiProperty({ description: 'deadline for the form' })
  @IsOptional()
  @IsDate()
  deadline?: Date;

  @ApiProperty({ description: 'is the form active ?' })
  @IsBoolean()
  isActive: boolean;
}

export class QuestionDto {
  @ApiProperty({ description: 'type of the question'})
  @IsEnum(Questions)
  type: Questions;

  @ApiProperty({ description: 'title of the question' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'is the question required ?' })
  @IsBoolean()
  isRequired: boolean;

  @ApiProperty({ description: 'optional description for the question' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Constraints for the question' })
  @ValidateNested()
  @Type(() => ValidationDto)
  @IsOptional()
  validations?: ValidationDto;

  @ApiProperty({ description: 'options for the question' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  options?: string[];
}
