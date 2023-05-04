import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { MailerService } from '../mailer/mailer.service'
import { MessageService } from '../message/message.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './entity/user.entity'
import { HttpModule } from '@nestjs/axios'
import { UserRepository } from './repository/user.repository'
import { UserMapper } from './mapper/user.mapper'

@Module({
  providers: [UserService, MailerService, MessageService, UserRepository, UserMapper],
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HttpModule,
  ],
})
export class UserModule {}
