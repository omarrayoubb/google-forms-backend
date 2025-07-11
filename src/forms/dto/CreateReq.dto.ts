import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { QuestionDto } from './Form.dto';
import { ApiProperty } from '@nestjs/swagger';
export class CreateReqDto {
  @ApiProperty({ description: 'request body for creating a new form' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'questions for the form' })
  @IsArray()
  @ValidateNested()
  @Type(() => QuestionDto)
  questions: QuestionDto[];

  @ApiProperty({ description: 'description for the form' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'is the form Public ?' })
  @IsBoolean()
  isActive: boolean;

}
