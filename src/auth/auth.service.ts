import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginResDto } from './Dto/LoginRespDto.dto';
import { RegisterReqDto } from './Dto/RegisterReqDto.dto';
import { RegisterResDto } from './Dto/RegisterResDto.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './Payloads/Jwt.payload';
import { User } from 'src/database/users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, plain: string): Promise<User> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new BadRequestException('User is not Found');
    }
    const match = await bcrypt.compare(plain, user.password);
    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
  async signIn(email: string, pass: string): Promise<LoginResDto> {
    const user = await this.validateUser(email, pass);
    const { username } = user;
    console.log(user);
    const id = await this.usersService.getUserID(email);
    const payload: JwtPayload = {
      id,
      username,
      email,
    };
    const token = await this.GenerateJwt(payload);
    const ResponseBody = {
      token,
      message: 'logged in successfully',
    };
    return ResponseBody;
  }

  async signUp(newUser: RegisterReqDto): Promise<RegisterResDto> {
    const hashedpassword: string = await this.bcryptHash(newUser.password);
    const userData = { ...newUser, password: hashedpassword };
    await this.usersService.createOne(userData);
    return {
      message: 'User has registered successfully',
    };
  }

  async GenerateJwt(payload: JwtPayload): Promise<string> {
    const JWT_Token = await this.jwtService.signAsync(payload);
    return JWT_Token;
  }

  async bcryptHash(Password: string): Promise<string> {
    return await bcrypt.hash(Password, 10);
  }
}
