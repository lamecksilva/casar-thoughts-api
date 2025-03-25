import { ApiProperty } from '@nestjs/swagger';
import { PostDto } from './post.dto';
import { IsArray, IsNumber } from 'class-validator';

export class GetProfileFeedPaginationDto {
  @ApiProperty({ required: true, example: 1 })
  @IsNumber()
  page: number;

  @ApiProperty({ required: true, example: 10 })
  @IsNumber()
  limit: number;
}

export class FeedDto {
  @ApiProperty({ required: true, example: 10 })
  total: number;

  @ApiProperty({ required: true, isArray: true, type: PostDto })
  @IsArray()
  posts: PostDto[];
}
