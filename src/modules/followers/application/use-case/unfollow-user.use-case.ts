import { BadRequestException, Injectable } from '@nestjs/common';
import { FollowersRepository } from '../../domain/repositories/followers.repository';
import { SuccessFollowResponseDto } from 'src/modules/users/application/dto/follow-user.dto';

@Injectable()
export class UnfollowUserUseCase {
  constructor(private readonly followersRepository: FollowersRepository) {}

  async execute(
    followerId: string,
    followingId: string,
  ): Promise<SuccessFollowResponseDto> {
    if (
      !(await this.followersRepository.isFollowing(followerId, followingId))
    ) {
      throw new BadRequestException("You don't follow this user");
    }

    await this.followersRepository.unfollowUser(followerId, followingId);

    return {
      success: true,
      message: 'User unfollowed successfully',
    };
  }
}
