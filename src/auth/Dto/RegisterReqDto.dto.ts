import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class RegisterReqDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({ description: 'username of the user' })
  @IsString()
  @IsNotEmpty()
  username: string;
  @ApiProperty({ description: 'password of the user' })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;
}
