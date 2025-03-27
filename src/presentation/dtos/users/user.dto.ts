import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString, IsUUID } from 'class-validator';
import { IPost } from 'src/domain/entities/post.entity';
import { IUser } from 'src/domain/entities/user.entity';

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
