import { Model } from 'mongoose';
import { User } from '../entity/user.entity';
import { UserDto } from '../dto/user.dto';
export declare class UserRepository {
    private readonly userModel;
    constructor(userModel: Model<User>);
    findByUserId(userId: number): Promise<User>;
    create(user: UserDto): Promise<User>;
    createByCriteria(object: unknown): Promise<User>;
    getByCriteria(object: unknown): Promise<User>;
    delete(object: unknown): Promise<void>;
}
