import { UserDto } from 'src/users/application/dto/user.dto';
import { IPost } from '../domain/entities/post.entity';

export class UserPostDto {
  name: string;
  displayName: string;
}

export class PostDto implements IPost {
  id: string;
  text: string;
  userId: string;
  user: UserDto;
  originalPostId?: string;
  originalPost?: PostDto;
  createdAt: Date;
}
