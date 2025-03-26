import { ApiProperty } from '@nestjs/swagger';
import { PostDto } from './post.dto';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export enum FeedType {
  ALL = 'ALL',
  FOLLOWING = 'FOLLOWING',
}

export class FeedPaginationDto {
  @ApiProperty({ required: true, example: 1 })
  @IsNumber()
  page: number;

  @ApiProperty({ required: true, example: 5 })
  @IsNumber()
  limit: number;
}

export class FeedResponseDto {
  @ApiProperty({ required: true, example: 10 })
  total: number;

  @ApiProperty({ required: true, isArray: true, type: PostDto })
  @IsArray()
  posts: PostDto[];
}

export class FeedParamsDto extends FeedPaginationDto {
  @ApiProperty({ required: true, example: FeedType.FOLLOWING })
  @IsEnum(FeedType)
  @IsString()
  type: FeedType;

  @ApiProperty({
    required: false,
    example: 'f30c9331-d8b0-4052-be48-df73b4002fdc',
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  userId?: string;
}
