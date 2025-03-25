import { Injectable, Logger } from '@nestjs/common';
import { GetUserProfileUseCase } from './application/use-cases/get-user-profile.use-case';
import {
  FollowUserDto,
  SuccessFollowResponseDto,
} from './application/dto/follow-user.dto';
import { FollowUserUseCase } from '../followers/application/use-case/follow-user.use-case';
import { UnfollowUserUseCase } from '../followers/application/use-case/unfollow-user.use-case';

@Injectable()
export class UsersService {
  constructor(
    private getProfileUseCase: GetUserProfileUseCase,
    private followUserUseCase: FollowUserUseCase,
    private unfollowUserUseCase: UnfollowUserUseCase,
  ) {}

  async getUserProfile(username: string) {
    Logger.log('Get user profile');

    return await this.getProfileUseCase.execute(username);
  }

  async followUser(
    followUserDto: FollowUserDto,
  ): Promise<SuccessFollowResponseDto> {
    Logger.log('Follow user');

    return await this.followUserUseCase.execute(
      followUserDto.followerId,
      followUserDto.followingId,
    );
  }

  async unfollowUser(
    unfollowUserDto: FollowUserDto,
  ): Promise<SuccessFollowResponseDto> {
    Logger.log('Unfollow user');

    return await this.unfollowUserUseCase.execute(
      unfollowUserDto.followerId,
      unfollowUserDto.followingId,
    );
  }
}
