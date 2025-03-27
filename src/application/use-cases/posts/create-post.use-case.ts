import { BadRequestException, Injectable } from '@nestjs/common';
import { IPost } from '../../../domain/entities/post.entity';
import { TextProcessingService } from '../../../infrastructure/external-services/text-processing.service';
import { PostsRepository } from 'src/domain/repositories/posts/posts.repository';
import { CreatePostDto } from 'src/presentation/dtos/posts/create-post.dto';

@Injectable()
export class CreatePostUseCase {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly textProcessingService: TextProcessingService,
  ) {}

  async execute(createPostDto: CreatePostDto, userId: string): Promise<IPost> {
    if (!createPostDto.text.length && !createPostDto.originalPostId) {
      throw new BadRequestException('Cannot create an empty post');
    }

    if ((await this.postsRepository.countTodayPosts(userId)) >= 5) {
      throw new BadRequestException('5 post day limit reached');
    }

    const sentiment =
      process.env.ALLOW_TEXT_PROCESSING === 'true'
        ? await this.textProcessingService.analyzeText(createPostDto.text)
        : 'neutral';

    return await this.postsRepository.create({
      ...createPostDto,
      sentiment,
      userId,
    });
  }
}
