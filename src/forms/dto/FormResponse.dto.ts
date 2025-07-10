import { IsArray, IsNumber, IsPositive } from 'class-validator';
import { FormDto } from './Form.dto';

export class FormResponseDto {
  @IsArray()
  forms: FormDto[];

  @IsNumber()
  @IsPositive()
  pageNumber: number;

  @IsNumber()
  @IsPositive()
  totalPages: number;

  @IsNumber()
  @IsPositive()
  totalNumberOfForms: number;
}
