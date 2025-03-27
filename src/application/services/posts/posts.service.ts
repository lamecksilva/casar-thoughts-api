import { Injectable } from '@nestjs/common';
import { CreatePostUseCase } from 'src/application/use-cases/posts/create-post.use-case';
import { GetFeedUseCase } from 'src/application/use-cases/posts/get-feed.use-case';
import { GetProfileFeedUseCase } from 'src/application/use-cases/posts/get-profile-feed.use-case';
import { CreatePostDto } from 'src/presentation/dtos/posts/create-post.dto';
import {
  FeedPaginationDto,
  FeedParamsDto,
  FeedResponseDto,
} from 'src/presentation/dtos/posts/feed.dto';
import { PostDto } from 'src/presentation/dtos/posts/post.dto';

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
