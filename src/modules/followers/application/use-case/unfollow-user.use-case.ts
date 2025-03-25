import { Injectable } from '@nestjs/common';
import { FollowersRepository } from '../../domain/repositories/followers.repository';

@Injectable()
export class UnfollowUserUseCase {
  constructor(private readonly followersRepository: FollowersRepository) {}

  async execute(followerId: string, followingId: string): Promise<void> {
    if (
      !(await this.followersRepository.isFollowing(followerId, followingId))
    ) {
      throw new Error("You don't follow this user");
    }

    await this.followersRepository.unfollowUser(followerId, followingId);
  }
}
