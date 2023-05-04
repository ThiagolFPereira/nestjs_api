import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { MailerService } from '../mailer/mailer.service'
import { MessageService } from '../message/message.service'
import { getModelToken } from '@nestjs/mongoose'
import { User } from './entity/user.entity'
import { UserDto } from './dto/user.dto'
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios'
import { of } from 'rxjs'
import * as crypto from 'crypto'
import * as fs from 'fs'
import * as path from 'path'
import { UserRepository } from './repository/user.repository'
import { Response } from 'express'
import { Image } from './image/image'

describe('UserService', () => {
  let service: UserService
  let mailerService: MailerService
  let rabbitMQService: MessageService
  let httpService: HttpService
  let repository: UserRepository

  const mockUserModel = jest.fn().mockImplementation((dto: any) => {
    const data = dto
    const save = jest.fn(entity => entity)
    const findOne = jest.fn(entity => entity)
    return { data, save, findOne }
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        MailerService,
        MessageService,
        UserRepository,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<UserService>(UserService)
    mailerService = module.get<MailerService>(MailerService)
    rabbitMQService = module.get<MessageService>(MessageService)
    httpService = module.get<HttpService>(HttpService)
    repository = module.get<UserRepository>(UserRepository)
  })

  it('should create a new user', async () => {
    const userDto: UserDto = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
    } as UserDto
    const user = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
    } as User

    jest.spyOn(mailerService, 'sendMail').mockImplementation()
    jest.spyOn(rabbitMQService, 'send').mockImplementation()
    jest.spyOn(repository, 'create').mockResolvedValue(user)

    const result: any = await service.create(userDto)
    expect(result).toEqual(user)
    expect(mailerService.sendMail).toHaveBeenCalledTimes(1)
    expect(rabbitMQService.send).toHaveBeenCalledTimes(1)
  })

  it('should return a user', async () => {
    const userId = '1'
    const user = {
      id: 1,
      email: 'george.bluth@reqres.in',
      first_name: 'George',
      last_name: 'Bluth',
      avatar: 'https://reqres.in/img/faces/1-image.jpg',
    }
    const response: AxiosResponse = {
      data: {
        data: user,
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    } as AxiosResponse

    jest.spyOn(httpService, 'get').mockImplementation(() => of(response))

    const result = await service.getUser(userId)

    expect(result).toEqual(user)
  })

  it('should return a base64 encoded image from a local file', async () => {
    const userId = '1'
    const userAvatar = 'https://reqres.in/img/faces/1-image.jpg'
    const hash = crypto.createHash('sha256').update(userAvatar).digest('hex')
    const base64String = 'VGhpcyBpcyBhIHRlc3QgYmFzZTY0IGVuY29kZWQgaW1hZ2U='
    const user = {
      id: 1,
      email: 'george.bluth@reqres.in',
      first_name: 'George',
      last_name: 'Bluth',
      avatar: 'https://reqres.in/img/faces/1-image.jpg',
    }
    const avatar = new Image();

    const filePath = avatar.getPath(hash)
    fs.writeFileSync(filePath, Buffer.from(base64String, 'base64'))
    jest.spyOn(service, 'getUser').mockResolvedValue(user as User)
    jest.spyOn(repository, 'getByCriteria').mockResolvedValue(user as User)

    const response = {
      write: jest.fn(),
      status: jest.fn(),
    } as any
    await service.getAvatar(userId, response)

    expect(response.write).toHaveBeenCalledWith(base64String)
    fs.unlinkSync(filePath)
  })

  it('should delete the user avatar and return a 200 status', async () => {
    const response: Response = {
      status: jest.fn().mockReturnThis(),
    } as any

    const user = {
      id: 1,
      email: 'george.bluth@reqres.in',
      first_name: 'George',
      last_name: 'Bluth',
      avatar: 'https://reqres.in/img/faces/1-image.jpg',
    } as User

    jest.spyOn(service, 'getUser').mockResolvedValue(user)
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined)
    const userId = '10'
    await service.deleteAvatar(userId, response)
    expect(service.getUser).toHaveBeenCalledWith(userId)
    expect(response.status).toHaveBeenCalledWith(200)
  })
})
