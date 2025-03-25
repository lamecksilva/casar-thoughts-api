import { Injectable } from '@nestjs/common';
import {
  FeedResponseDto,
  GetProfileFeedPaginationDto,
} from './application/dto/feed.dto';
import { GetProfileFeedUseCase } from './application/use-cases/get-profile-feed.use-case';

@Injectable()
export class PostsService {
  constructor(private getProfileFeedUseCase: GetProfileFeedUseCase) {}

  async getProfileFeed(
    username: string,
    pagination: GetProfileFeedPaginationDto,
  ): Promise<FeedResponseDto> {
    return await this.getProfileFeedUseCase.execute(username, pagination);
  }
}
