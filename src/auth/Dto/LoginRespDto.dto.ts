import { ApiProperty } from '@nestjs/swagger';
export class LoginResDto {
  @ApiProperty({ description: 'message for the response' })
  message: string;
  @ApiProperty({ description: 'token for the user' })
  token: string;
}
