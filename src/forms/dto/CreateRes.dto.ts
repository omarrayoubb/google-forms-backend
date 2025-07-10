import { IsString } from 'class-validator';

import { Forms } from 'src/database/forms/Form.schema';

export class CreateResDto {
  @IsString()
  message: string;
  @IsString()
  formId: string;
  form: Forms;
}
