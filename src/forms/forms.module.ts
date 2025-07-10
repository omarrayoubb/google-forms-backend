import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
// import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Forms, FormsSchema } from 'src/database/forms/Form.schema';
import { FormsController } from './forms.controller';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Forms.name, schema: FormsSchema }]),
  ],
  providers: [FormsService],
  controllers: [FormsController],
  exports: [FormsService],
})
export class FormsModule {}
