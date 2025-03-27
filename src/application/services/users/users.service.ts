import { Injectable, Logger } from '@nestjs/common';
import {
  FollowUserDto,
  SuccessFollowResponseDto,
} from 'src/presentation/dtos/users/follow-user.dto';
import { FollowUserUseCase } from '../../use-cases/followers/follow-user.use-case';
import { UnfollowUserUseCase } from '../../use-cases/followers/unfollow-user.use-case';
import { GetUserProfileUseCase } from '../../use-cases/users/get-user-profile.use-case';

@Injectable()
export class UsersService {
  constructor(
    private getProfileUseCase: GetUserProfileUseCase,
    private followUserUseCase: FollowUserUseCase,
    private unfollowUserUseCase: UnfollowUserUseCase,
  ) {}

  async getUserProfile(username: string, loggedUserId?: string) {
    Logger.log('Get user profile');

    return await this.getProfileUseCase.execute(username, loggedUserId);
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
