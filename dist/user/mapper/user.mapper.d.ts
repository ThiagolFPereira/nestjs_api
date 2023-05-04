import { UserDto } from '../dto/user.dto';
import { User } from '../entity/user.entity';
export declare class UserMapper {
    mapToDto(user: User): UserDto;
}
