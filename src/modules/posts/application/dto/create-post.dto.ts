import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Lorem Ipsum', required: true })
  @IsString()
  text: string;

  @ApiProperty({
    example: '02e09ae5-b504-48dd-8944-edaf9c204e56',
    required: false,
  })
  @IsString()
  @IsUUID()
  originalPostId?: string;
}

export class CreatePostQueryDto {
  @ApiProperty({
    example: '0639e277-a293-4e27-bfc2-15d371423c3c',
    required: true,
    description: 'Authenticaded user ID / Follower ID',
  })
  @IsString()
  @IsUUID()
  authenticatedUserId: string;
}
