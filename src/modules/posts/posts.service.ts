import { Injectable } from '@nestjs/common';
import {
  FeedResponseDto,
  FeedPaginationDto,
  FeedParamsDto,
} from './application/dto/feed.dto';
import { GetProfileFeedUseCase } from './application/use-cases/get-profile-feed.use-case';
import { GetFeedUseCase } from './application/use-cases/get-feed.use-case';

@Injectable()
export class PostsService {
  constructor(
    private getProfileFeedUseCase: GetProfileFeedUseCase,
    private getFeedUseCase: GetFeedUseCase,
  ) {}

  async getProfileFeed(
    username: string,
    pagination: FeedPaginationDto,
  ): Promise<FeedResponseDto> {
    return await this.getProfileFeedUseCase.execute(username, pagination);
  }

  async getFeed(feedParamsDto: FeedParamsDto): Promise<FeedResponseDto> {
    return await this.getFeedUseCase.execute(feedParamsDto);
  }
}
