import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/database/users/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async findOne(email: string): Promise<User | undefined | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async getUserID(email: string): Promise<string | undefined | null> {
    const user = await this.userModel.findOne({ email });
    return user?._id.toString();
  }

  async createOne({ email, password, username }: User): Promise<boolean> {
    const user = await this.findOne(email);
    if (user !== null) {
      throw new BadRequestException('User Already has an account');
    }
    const newUser = await this.userModel.create({
      email,
      password,
      username,
    });
    if (!newUser) {
      throw new BadRequestException(
        'A problem in User Creation please try again later',
      );
    }
    return true;
  }
}
