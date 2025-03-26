import { Injectable } from '@nestjs/common';
import {
  FeedResponseDto,
  FeedPaginationDto,
  FeedParamsDto,
} from './application/dto/feed.dto';
import { GetProfileFeedUseCase } from './application/use-cases/get-profile-feed.use-case';
import { GetFeedUseCase } from './application/use-cases/get-feed.use-case';
import { CreatePostDto } from './application/dto/create-post.dto';
import { PostDto } from './application/dto/post.dto';
import { CreatePostUseCase } from './application/use-cases/create-post.use-case';

@Injectable()
export class PostsService {
  constructor(
    private getProfileFeedUseCase: GetProfileFeedUseCase,
    private getFeedUseCase: GetFeedUseCase,
    private createPostUseCase: CreatePostUseCase,
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

  async createPost(
    createPostDto: CreatePostDto,
    userId: string,
  ): Promise<PostDto> {
    return await this.createPostUseCase.execute(createPostDto, userId);
  }
}
