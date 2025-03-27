import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { PostsService } from 'src/application/services/posts/posts.service';
import {
  CreatePostDto,
  CreatePostQueryDto,
} from 'src/presentation/dtos/posts/create-post.dto';
import {
  FeedPaginationDto,
  FeedParamsDto,
  FeedResponseDto,
} from 'src/presentation/dtos/posts/feed.dto';
import { PostDto } from 'src/presentation/dtos/posts/post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/feed')
  @ApiOperation({ summary: 'Get feed posts' })
  @ApiResponse({ status: 200, type: FeedResponseDto })
  async feed(@Query() feedParams: FeedParamsDto) {
    return await this.postsService.getFeed(feedParams);
  }

  @Get('user/:username')
  @ApiParam({ name: 'username', example: 'Edison56' })
  @ApiOperation({ summary: 'Profile feed' })
  @ApiResponse({ status: 200, type: FeedResponseDto })
  async feedByUser(
    @Param('username') username: string,
    @Query() pagination: FeedPaginationDto,
  ) {
    return await this.postsService.getProfileFeed(username, pagination);
  }

  @Post('')
  @ApiOperation({ summary: 'Create post' })
  @ApiResponse({ status: 201, type: PostDto })
  async create(
    @Body() createPostDto: CreatePostDto,
    @Query() { authenticatedUserId }: CreatePostQueryDto,
  ) {
    return await this.postsService.createPost(
      createPostDto,
      authenticatedUserId,
    );
  }
}
