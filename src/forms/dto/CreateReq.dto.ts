import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { QuestionDto } from './Form.dto';

export class CreateReqDto {
  @IsString()
  title: string;

  @IsArray()
  @ValidateNested()
  @Type(() => QuestionDto)
  questions: QuestionDto[];

  @IsOptional()
  @IsString()
  description?: string;

  @IsBoolean()
  isActive: boolean;
}
