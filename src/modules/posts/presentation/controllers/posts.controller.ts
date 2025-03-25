import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { GetProfileFeedPaginationDto } from '../../application/dto/feed.dto';
import { PostsService } from '../../posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('feed/:username')
  @ApiParam({ name: 'username', example: 'Lameck27' })
  async findAll(
    @Param('username') username: string,
    @Query() pagination: GetProfileFeedPaginationDto,
  ) {
    return await this.postsService.getProfileFeed(username, pagination);
  }
}
