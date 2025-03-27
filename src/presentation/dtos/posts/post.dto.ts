import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';
import { IPost } from 'src/domain/entities/post.entity';
import { UserDto } from '../users/user.dto';

export class UserPostDto {
  @ApiProperty({
    example: '36b8d4d4-b764-4bb5-9c92-5e5835bb1b7c',
    required: true,
  })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'Walter51', required: true })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Walter 51 years', required: true })
  @IsString()
  displayName: string;
}

export class PostDto implements IPost {
  @ApiProperty({
    example: '36b8d4d4-b764-4bb5-9c92-5e5835bb1b7c',
    required: true,
  })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'Vorax verto supplanto viridis.', required: false })
  @IsString()
  text: string;

  @ApiProperty({
    required: true,
    example: '6653adf5-714a-40bf-a2a3-ef0a2d413148',
  })
  @IsString()
  @IsUUID()
  userId: string;

  @ApiProperty({ required: true, type: UserPostDto })
  user: UserDto;

  @ApiProperty({
    example: '36b8d4d4-b764-4bb5-9c92-5e5835bb1b7c',
    required: false,
  })
  @IsOptional()
  @IsString()
  originalPostId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  originalPost?: PostDto;

  @ApiProperty({ required: true, example: '2025-03-26' })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({ required: true, example: 'pos' })
  @IsString()
  sentiment: string;
}
