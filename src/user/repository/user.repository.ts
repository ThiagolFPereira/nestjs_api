import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '../entity/user.entity'
import { UserDto } from '../dto/user.dto'

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findByUserId(userId: number): Promise<User> {
    return this.userModel.findOne({ userId }).exec()
  }

  async create(user: UserDto): Promise<User> {
    const createdUser = new this.userModel(user)
    return createdUser.save()
  }
  public createByCriteria(object: unknown): Promise<User> {
    return this.userModel.create(object)
  }
  async getByCriteria(object: unknown): Promise<User> {
    return this.userModel.findOne(object)
  }

  async delete(object: unknown): Promise<void> {
    this.userModel.deleteOne(object)
  }
}
