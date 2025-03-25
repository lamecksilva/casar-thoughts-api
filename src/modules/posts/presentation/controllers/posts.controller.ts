import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import {
  FeedResponseDto,
  GetProfileFeedPaginationDto,
} from '../../application/dto/feed.dto';
import { PostsService } from '../../posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('feed/:username')
  @ApiParam({ name: 'username', example: 'Edison56' })
  @ApiOperation({ summary: 'Retorna o feed do usuário' })
  @ApiResponse({ status: 200, type: FeedResponseDto })
  async findAll(
    @Param('username') username: string,
    @Query() pagination: GetProfileFeedPaginationDto,
  ) {
    return await this.postsService.getProfileFeed(username, pagination);
  }
}
