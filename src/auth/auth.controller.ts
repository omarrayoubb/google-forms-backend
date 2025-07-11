import {
  Controller,
  Body,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginReqDTO } from './Dto/LoginReqDto.dto';
import { LoginResDto } from './Dto/LoginRespDto.dto';
import { RegisterResDto } from './Dto/RegisterResDto.dto';
import { RegisterReqDto } from './Dto/RegisterReqDto.dto';
// import { AuthGuard } from './auth.guard';
import { Public } from './Decorators/Public';
import { ApiOperation } from '@nestjs/swagger';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOperation({ summary: 'Login a user' })

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginReqDTO): Promise<LoginResDto> {
    // console.log(signInDto);
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
  @ApiOperation({ summary: 'Register a new user' })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() signUpDto: RegisterReqDto): Promise<RegisterResDto> {
    return this.authService.signUp(signUpDto);
  }

  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
