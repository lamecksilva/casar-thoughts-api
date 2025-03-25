import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class ProfileDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'Edison56' })
  @IsString()
  username: string;

  @ApiProperty({ example: '24/02/2025' })
  @IsString()
  memberSince: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  followers: number;

  @ApiProperty({ example: 12 })
  @IsNumber()
  following: number;

  @ApiProperty({ example: 15 })
  @IsNumber()
  posts: number;

  @ApiProperty({ example: false })
  isFollowing: boolean;
}

class PostDto {
  id: string;
  text: string;
}
export class FeedDto {
  posts: PostDto[];
  count: number;
}
