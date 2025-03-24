import { Injectable, Logger } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  create(createPostDto: CreatePostDto) {
    Logger.log(createPostDto);
    return 'This action adds a new post';
  }

  findAll() {
    return `This action returns all posts`;
  }
}
