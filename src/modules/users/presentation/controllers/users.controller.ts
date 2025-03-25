import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import {
  FollowUserQueryDto,
  SuccessFollowResponseDto,
} from '../../application/dto/follow-user.dto';
import { ProfileDto } from '../../application/dto/profile.dto';
import { UsersService } from '../../users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  @ApiOperation({ summary: 'Get profile data of an user by username' })
  @ApiResponse({ status: 200, type: ProfileDto })
  @ApiParam({
    name: 'username',
    example: 'Edison56',
    description: 'Username of user',
  })
  async findOne(@Param('username') username: string) {
    return await this.usersService.getUserProfile(username);
  }

  @Post(':id/follow')
  @ApiOperation({ summary: 'Follows user' })
  @ApiParam({
    name: 'id',
    example: 'f30c9331-d8b0-4052-be48-df73b4002fdc',
    description: 'ID of user to be followed',
  })
  @ApiResponse({ status: 200, type: SuccessFollowResponseDto })
  async followUser(
    @Param('id') followingId: string,
    @Query() query: FollowUserQueryDto,
  ) {
    return await this.usersService.followUser({
      // Como não foi pedido para adicionar autenticação, adicionei esse modo de passar dado de um usuário logado
      followerId: query.authenticatedUserId,
      followingId,
    });
  }
}
