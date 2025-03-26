import { BadRequestException, Injectable } from '@nestjs/common';
import { IPost } from '../../domain/entities/post.entity';
import { PostsRepository } from '../../domain/repositories/posts.repository';
import { CreatePostDto } from '../dto/create-post.dto';

@Injectable()
export class CreatePostUseCase {
  constructor(private readonly postsRepository: PostsRepository) {}

  async execute(createPostDto: CreatePostDto, userId: string): Promise<IPost> {
    if (!createPostDto.text.length && !createPostDto.originalPostId) {
      throw new BadRequestException('Cannot create an empty post');
    }

    if ((await this.postsRepository.countTodayPosts(userId)) >= 5) {
      throw new BadRequestException('5 post day limit reached');
    }

    return await this.postsRepository.create({ ...createPostDto, userId });
  }
}
