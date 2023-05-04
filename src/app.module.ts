import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MailerService } from './mailer/mailer.service'
import { MailerModule } from './mailer/mailer.module'
import { MessageService } from './message/message.service'
import { MessageModule } from './message/message.module'
import { UserModule } from './user/user.module'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './user/entity/user.entity'
import { UserRepository } from './user/repository/user.repository'
import { UserService } from './user/user.service'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    MailerModule,
    MessageModule,
    UserModule,
    HttpModule,
    MongooseModule.forRoot('mongodb://localhost/appback'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    MailerService,
    MessageService,
    UserService,
    UserRepository,
  ],
})
export class AppModule {}
