import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    Logger.log(createUserDto);
    return 'This action adds a new user';
  }

  findByUsername(username: string) {
    return `This action returns the user by username @${username}`;
  }
}
