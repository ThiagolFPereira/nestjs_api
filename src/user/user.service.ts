import { Injectable } from '@nestjs/common'
import { MailerService } from '../mailer/mailer.service'
import { MessageService } from '../message/message.service'
import { User } from './entity/user.entity'
import { UserDto } from './dto/user.dto'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import * as crypto from 'crypto'
import * as fs from 'fs'
import * as path from 'path'
import { Response } from 'express'
import { UserRepository } from './repository/user.repository'
import { Image } from './image/image'

@Injectable()
export class UserService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly rabbitMQService: MessageService,
    private readonly userRepository: UserRepository,
    private httpService: HttpService,
  ) {}

  async create(userDto: UserDto): Promise<User> 
  {
    try {
      const user = await this.userRepository.create(userDto)
      await this.mailerService.sendMail(
        user.email,
        'New user created',
        `Hello ${user.first_name}, your user has been created successfully!`,
      )
      this.rabbitMQService.send(user)
      return user
    } catch (error) {
      throw new Error(error)
    }
  }

  async getUser(userId: string): Promise<User> 
  {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`https://reqres.in/api/users/${userId}`),
      )
      const dataReponse = response.data
      return dataReponse.data
    } catch (error) {
      throw new Error(error)
    }
  }

  async avatarHash(userId: string) 
  {
    const userAvatar = (await this.getUser(userId)).avatar;
    const hash = crypto.createHash('sha256').update(userAvatar).digest('hex');
    return hash;
  }

  async getAvatar(userId: string, response: Response): Promise<void> 
  {
    try {
      const avatar = new Image();
      const hash = await this.avatarHash(userId);
      const user = await this.userRepository.getByCriteria({ userId, hash })
      const filePath = avatar.getPath(hash)
      if (user) {
        avatar.checkIfImageExist(filePath, response)
        response.status(200)
      } else {
        const image = await avatar.downloadImage(user)
        const buffer = Buffer.from(image.data, 'binary')
        avatar.saveImage(filePath, buffer)
        await this.userRepository.createByCriteria({ userId, hash })
        response.write(buffer.toString('base64'))
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteAvatar(userId: string, response: Response): Promise<void> 
  {
    try {
      const avatar = new Image();
      const hash = await this.avatarHash(userId);
      await this.userRepository.delete({ userId, hash })
      const filePath = avatar.getPath(hash)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
      response.status(200)
    } catch (error) {
      throw new Error(error)
    }
  }
}
