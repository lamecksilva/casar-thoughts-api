import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class AuthenticatedUserQueryDto {
  @ApiProperty({
    example: '0639e277-a293-4e27-bfc2-15d371423c3c',
    required: true,
    description: 'Authenticaded user ID / Follower ID',
  })
  @IsString()
  @IsUUID()
  authenticatedUserId: string;
}

export class FollowUserDto {
  @ApiProperty({
    example: '0639e277-a293-4e27-bfc2-15d371423c3c',
    required: true,
  })
  @IsString()
  @IsUUID()
  followerId: string;

  @ApiProperty({
    example: 'f30c9331-d8b0-4052-be48-df73b4002fdc',
    required: false,
  })
  @IsString()
  @IsUUID()
  followingId: string;
}

export class SuccessFollowResponseDto {
  @ApiProperty({ example: true, required: true })
  @IsBoolean()
  success: boolean;

  @ApiProperty({ example: 'User followed successfully', required: true })
  @IsString()
  message: string;
}
