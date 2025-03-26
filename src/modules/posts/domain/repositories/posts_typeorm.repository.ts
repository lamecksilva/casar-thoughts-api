import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IPost, PostEntityTypeORM } from '../entities/post.entity';
import {
  ICreatePost,
  IPagination,
  IPostsResponse,
  PostsRepository,
} from './posts.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';

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
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.originalPost', 'originalPost')
      .leftJoinAndSelect('originalPost.user', 'originalPostUser')
      .select([
        'post',
        'user.id',
        'user.username',
        'user.displayName',
        'originalPost.id',
        'originalPost.text',
        'originalPost.createdAt',
        'originalPostUser.id',
        'originalPostUser.username',
        'originalPostUser.displayName',
      ])
      .where('post.userId = :userId', { userId })
      .orderBy('post.createdAt', 'DESC')
      .skip(((pagination.page ?? 1) - 1) * (pagination.limit ?? 5))
      .take(pagination.limit ?? 5)
      .getManyAndCount();

    return { total, posts };

    return { total, posts };
  }

  async findAll(pagination: IPagination): Promise<IPostsResponse> {
    const [posts, total] = await this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.originalPost', 'originalPost')
      .leftJoinAndSelect('originalPost.user', 'originalPostUser')
      .select([
        'post',
        'user.id',
        'user.username',
        'user.displayName',
        'originalPost.id',
        'originalPost.text',
        'originalPost.createdAt',
        'originalPostUser.id',
        'originalPostUser.username',
        'originalPostUser.displayName',
      ])
      .orderBy('post.createdAt', 'DESC')
      .skip(((pagination.page ?? 1) - 1) * (pagination.limit ?? 10))
      .take(pagination.limit ?? 10)
      .getManyAndCount();

    return { total, posts };
  }

  async findByUserIds(
    userIds: string[],
    pagination: IPagination,
  ): Promise<IPostsResponse> {
    const [posts, total] = await this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.originalPost', 'originalPost')
      .leftJoinAndSelect('originalPost.user', 'originalPostUser')
      .select([
        'post',
        'user.id',
        'user.username',
        'user.displayName',
        'originalPost.id',
        'originalPost.text',
        'originalPost.createdAt',
        'originalPostUser.id',
        'originalPostUser.username',
        'originalPostUser.displayName',
      ])
      .where('post.userId IN (:...userIds)', { userIds })
      .orderBy('post.createdAt', 'DESC')
      .skip(((pagination.page ?? 1) - 1) * (pagination.limit ?? 10))
      .take(pagination.limit ?? 10)
      .getManyAndCount();

    return { total, posts };
  }

  async create(createPostDto: ICreatePost): Promise<IPost> {
    const post = this.postsRepository.create({
      ...createPostDto,
      originalPostId: createPostDto.originalPostId || null,
    });

    return await this.postsRepository.save(post);
  }

  async countTodayPosts(userId: string): Promise<number> {
    const { count } = await this.postsRepository
      .createQueryBuilder('post')
      .where('post.userId = :userId', { userId })
      .andWhere('DATE(post.createdAt) = CURRENT_DATE')
      .select('COUNT(post.id)', 'count')
      .getRawOne();

    return Number(count) || 0;
  }
}
