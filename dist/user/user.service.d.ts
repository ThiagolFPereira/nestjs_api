import { MailerService } from '../mailer/mailer.service';
import { MessageService } from '../message/message.service';
import { User } from './entity/user.entity';
import { UserDto } from './dto/user.dto';
import { HttpService } from '@nestjs/axios';
import { Response } from 'express';
import { UserRepository } from './repository/user.repository';
export declare class UserService {
    private readonly mailerService;
    private readonly rabbitMQService;
    private readonly userRepository;
    private httpService;
    constructor(mailerService: MailerService, rabbitMQService: MessageService, userRepository: UserRepository, httpService: HttpService);
    create(userDto: UserDto): Promise<User>;
    getUser(userId: string): Promise<User>;
    avatarHash(userId: string): Promise<any>;
    getAvatar(userId: string, response: Response): Promise<void>;
    deleteAvatar(userId: string, response: Response): Promise<void>;
}
