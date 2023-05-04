import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common'
import { UserService } from './user.service'
import { UserDto } from './dto/user.dto'
import { Response } from 'express'
import { ApiUseTags } from '@nestjs/swagger'
import { UserMapper } from './mapper/user.mapper'

@ApiUseTags('doc')
@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService, private readonly userMapper: UserMapper) {}

  @Post('users')
  async createUsers(@Body() userDTO: UserDto) 
  {
    try {
      const user = await this.userService.create(userDTO)
      return this.userMapper.mapToDto(user);
    } catch (error) {
      throw new Error(error)
    }
  }

  @Get('user/:userId')
  async getUser(@Param('userId') userId: string) 
  {
    try {
      const user =  await this.userService.getUser(userId)
      return this.userMapper.mapToDto(user);
    } catch (error) {
      throw new Error(error)
    }
  }

  @Get('user/:userId/avatar')
  async getAvatar(@Res() response: Response, @Param('userId') userId: string) 
  {
    try {
      await this.userService.getAvatar(userId, response)
      response.end()
    } catch (error) {
      throw new Error(error)
    }
  }

  @Delete('user/:userId/avatar')
  async deleteAvatar(
    @Res() response: Response,
    @Param('userId') userId: string,
  ) 
  {
    try {
      await this.userService.deleteAvatar(userId, response)
      response.end()
    } catch (error) {
      throw new Error(error)
    }
  }
}
