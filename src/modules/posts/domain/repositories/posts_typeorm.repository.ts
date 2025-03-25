import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostEntityTypeORM } from '../entities/post.entity';
import {
  IPagination,
  IPostsResponse,
  PostsRepository,
} from './posts.repository';
import { InjectRepository } from '@nestjs/typeorm';

Injectable();
export class PostsTypeORMRepository implements PostsRepository {
  constructor(
    @InjectRepository(PostEntityTypeORM)
    private readonly postsRepository: Repository<PostEntityTypeORM>,
  ) {}

  async findPostsByUser(
    userId: string,
    pagination?: IPagination,
  ): Promise<IPostsResponse> {
    const [posts, total] = await this.postsRepository
      .createQueryBuilder('post')
      .where('post.userId = :userId', { userId })
      .orderBy('post.createdAt', 'DESC')
      .skip(((pagination.page ?? 1) - 1) * (pagination.limit ?? 10))
      .take(pagination.limit ?? 10)
      .getManyAndCount();

    return { total, posts };
  }
}
