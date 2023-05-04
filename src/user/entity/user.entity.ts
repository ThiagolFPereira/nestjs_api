import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class User extends Document {
  @Prop()
  userId: number

  @Prop()
  email: string

  @Prop()
  first_name: string

  @Prop()
  last_name: string

  @Prop()
  avatar: string

  @Prop()
  hash: string
}

export const UserSchema = SchemaFactory.createForClass(User)
