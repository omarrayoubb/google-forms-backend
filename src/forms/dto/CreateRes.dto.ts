import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { Forms } from 'src/database/forms/Form.schema';

export class CreateResDto {
  @ApiProperty({ description: 'message for the response' })
  @IsString()
  message: string;
  @ApiProperty({ description: 'generated form id' })
  @IsString()
  formId: string;
  form: Forms;
}
