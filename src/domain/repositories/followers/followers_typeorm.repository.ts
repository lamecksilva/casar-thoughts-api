import { InjectRepository } from '@nestjs/typeorm';
import { FollowEntityTypeORM } from 'src/domain/entities/followers.entity';
import { Repository } from 'typeorm';
import { FollowersRepository } from './followers.repository';

export class FollowersTypeORMRepository implements FollowersRepository {
  constructor(
    @InjectRepository(FollowEntityTypeORM)
    private readonly followersRepository: Repository<FollowEntityTypeORM>,
  ) {}

  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    const count = await this.followersRepository.count({
      where: {
        followerId,
        followingId,
      },
    });

    return count > 0;
  }

  async followUser(followerId: string, followingId: string): Promise<void> {
    await this.followersRepository.insert({ followerId, followingId });
  }

  async unfollowUser(followerId: string, followingId: string): Promise<void> {
    await this.followersRepository.delete({ followerId, followingId });
  }

  async findFollowersIds(userId: string): Promise<string[]> {
    const following = await this.followersRepository
      .createQueryBuilder('followers')
      .select('followers.followingId')
      .where('followers.followerId = :userId', { userId })
      .getMany();

    return following.map((f) => f.followingId);
  }
}
