import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginReqDTO {
  @ApiProperty({ description: 'email of the user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({ description: 'password of the user' })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;
}
