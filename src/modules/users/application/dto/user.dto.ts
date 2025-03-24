import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsDateString } from 'class-validator';
import { IPost } from 'src/modules/posts/domain/entities/post.entity';
import { IUser } from '../../domain/entities/user.entity';

export class UserDto implements IUser {
  @ApiProperty({ required: true })
  @IsUUID()
  @IsString()
  id: string;

  @ApiProperty({ required: true })
  @IsDateString()
  @IsString()
  createdAt: Date;

  @ApiProperty({ required: true })
  @IsString()
  username: string;

  @ApiProperty({ required: true })
  @IsString()
  displayName: string;

  @ApiProperty({ isArray: true, type: UserDto })
  following: IUser[];

  @ApiProperty({ isArray: true, type: UserDto })
  followers: IUser[];

  @ApiProperty({ isArray: true })
  posts: IPost[];
}
