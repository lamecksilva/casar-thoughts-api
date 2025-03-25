import { BadRequestException, Injectable } from '@nestjs/common';
import { FollowersRepository } from '../../domain/repositories/followers.repository';
import { SuccessFollowResponseDto } from 'src/modules/users/application/dto/follow-user.dto';

@Injectable()
export class FollowUserUseCase {
  constructor(private readonly followersRepository: FollowersRepository) {}

  async execute(
    followerId: string,
    followingId: string,
  ): Promise<SuccessFollowResponseDto> {
    if (followerId === followingId) {
      throw new BadRequestException("You can't follow yourself");
    }

    if (await this.followersRepository.isFollowing(followerId, followingId)) {
      throw new BadRequestException('You is already following this user');
    }

    await this.followersRepository.followUser(followerId, followingId);

    return {
      success: true,
      message: 'User followed successfully',
    };
  }
}
