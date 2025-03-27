import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PostsRepository } from 'src/domain/repositories/posts/posts.repository';
import { UsersRepository } from 'src/domain/repositories/users/users.repository';
import { FeedPaginationDto } from 'src/presentation/dtos/posts/feed.dto';

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
