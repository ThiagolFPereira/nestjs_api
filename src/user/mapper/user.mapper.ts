import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { User } from '../entity/user.entity';

@Injectable()
export class UserMapper {
  mapToDto(user: User): UserDto {
      const dto = new UserDto();
      dto.id = user.id;
      dto.first_name = user.first_name;
      dto.last_name = user.last_name;
      dto.email = user.email;
      dto.avatar = user.avatar;
    return dto;
  }
}
