import { Injectable, Logger } from '@nestjs/common';
import { FollowersRepository } from 'src/domain/repositories/followers/followers.repository';
import { PostsRepository } from 'src/domain/repositories/posts/posts.repository';
import {
  FeedParamsDto,
  FeedResponseDto,
  FeedType,
} from 'src/presentation/dtos/posts/feed.dto';

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
