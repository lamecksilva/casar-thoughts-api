import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/domain/repositories/users.repository';
import { PostsRepository } from '../../domain/repositories/posts.repository';
import { FeedPaginationDto } from '../dto/feed.dto';

@Injectable()
export class GetProfileFeedUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly postsRepository: PostsRepository,
  ) {}

  async execute(username: string, pagination: FeedPaginationDto) {
    Logger.log(`Get profile feed for ${username}`);

    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new NotFoundException(`User ${username} not found`);
    }

    return await this.postsRepository.findPostsByUser(user.id, pagination);
  }
}
