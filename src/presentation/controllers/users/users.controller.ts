import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UsersService } from 'src/application/services/users/users.service';
import {
  AuthenticatedUserQueryDto,
  SuccessFollowResponseDto,
} from 'src/presentation/dtos/users/follow-user.dto';
import { ProfileDto } from 'src/presentation/dtos/users/profile.dto';

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
  async findOne(
    @Param('username') username: string,
    @Query() { authenticatedUserId }: AuthenticatedUserQueryDto,
  ) {
    return await this.usersService.getUserProfile(
      username,
      authenticatedUserId,
    );
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
    @Query() query: AuthenticatedUserQueryDto,
  ) {
    return await this.usersService.followUser({
      followerId: query.authenticatedUserId,
      followingId,
    });
  }

  @Post(':id/unfollow')
  @ApiOperation({ summary: 'Unfollow user' })
  @ApiParam({
    name: 'id',
    example: 'f30c9331-d8b0-4052-be48-df73b4002fdc',
    description: 'ID of user to be unfollowed',
  })
  @ApiResponse({ status: 200, type: SuccessFollowResponseDto })
  async unfollowUser(
    @Param('id') followingId: string,
    @Query() query: AuthenticatedUserQueryDto,
  ) {
    return await this.usersService.unfollowUser({
      followerId: query.authenticatedUserId,
      followingId,
    });
  }
}
