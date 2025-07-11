import { IsArray, IsNumber, IsPositive } from 'class-validator';
import { FormDto } from './Form.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FormResponseDto {
  @ApiProperty({ description: 'forms requested by user' })
  @IsArray()
  forms: FormDto[];

  @ApiProperty({ description: 'page current Page Number' })
  @IsNumber()
  @IsPositive()
  pageNumber: number;

  @ApiProperty({ description: 'total pages' })
  @IsNumber()
  @IsPositive()
  totalPages: number;

  @ApiProperty({ description: 'total number of forms' })
  @IsNumber()
  @IsPositive()
  totalNumberOfForms: number;
}
