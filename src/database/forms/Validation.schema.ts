import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Validation {
  @Prop()
  length?: number;

  @Prop([String]) fileTypes?: string[];

  @Prop() FileSize?: number;

  //   @Prop() minDate?: Date;

  //   @Prop() maxDate?: Date;
}

export const ValidationSchema = SchemaFactory.createForClass(Validation);
