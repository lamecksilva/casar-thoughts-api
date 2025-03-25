import { UserDto } from 'src/modules/users/application/dto/user.dto';
import { IPost } from '../../domain/entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class UserPostDto {
  name: string;
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

  @ApiProperty({ required: true })
  user: UserDto;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  originalPostId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  originalPost?: PostDto;

  @ApiProperty({ required: true, example: '2020' })
  @IsDateString()
  createdAt: Date;
}
