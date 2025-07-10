import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Questions } from 'src/database/Enum/Questions.enum';

export class UpdateFormReqDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateQuestionsDto)
  questions?: UpdateQuestionsDto[];
}

export class UpdateQuestionsDto {
  @IsOptional()
  @IsEnum(Questions)
  type?: Questions;

  @IsString()
  @IsNotEmpty()
  questionId: string;

  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @IsOptional()
  @IsArray()
  options?: string[];
}
