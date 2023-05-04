import { IsEmail, IsNotEmpty, IsString, IsUrl, IsNumber } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsUrl()
  avatar: string;
}
