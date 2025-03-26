import { Injectable, Logger } from '@nestjs/common';
import { FeedParamsDto, FeedResponseDto, FeedType } from '../dto/feed.dto';
import { PostsRepository } from '../../domain/repositories/posts.repository';
import { FollowersRepository } from 'src/modules/followers/domain/repositories/followers.repository';

@Injectable()
export class GetFeedUseCase {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly followersRepository: FollowersRepository,
  ) {}

  async execute(feedParams: FeedParamsDto): Promise<FeedResponseDto> {
    Logger.log('Get feed ');

    if (feedParams.type === FeedType.FOLLOWING) {
      const followingUserIds = await this.followersRepository.findFollowersIds(
        feedParams?.userId,
      );
      if (followingUserIds.length === 0) {
        return { total: 0, posts: [] };
      }
      return this.postsRepository.findByUserIds(followingUserIds, feedParams);
    }

    return await this.postsRepository.findAll(feedParams);
  }
}
