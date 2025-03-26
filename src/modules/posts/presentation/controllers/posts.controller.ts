import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import {
  FeedResponseDto,
  FeedPaginationDto,
  FeedParamsDto,
} from '../../application/dto/feed.dto';
import { PostsService } from '../../posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

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

  @Get('/feed')
  @ApiOperation({ summary: 'Get feed posts' })
  @ApiResponse({ status: 200, type: FeedResponseDto })
  async feed(@Query() feedParams: FeedParamsDto) {
    return await this.postsService.getFeed(feedParams);
  }
}
