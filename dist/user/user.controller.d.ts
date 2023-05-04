import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { Response } from 'express';
import { UserMapper } from './mapper/user.mapper';
export declare class UserController {
    private readonly userService;
    private readonly userMapper;
    constructor(userService: UserService, userMapper: UserMapper);
    createUsers(userDTO: UserDto): unknown;
    getUser(userId: string): unknown;
    getAvatar(response: Response, userId: string): any;
    deleteAvatar(response: Response, userId: string): any;
}
