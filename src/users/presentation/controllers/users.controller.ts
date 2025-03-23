import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.getUserProfile(username);
  }
}
