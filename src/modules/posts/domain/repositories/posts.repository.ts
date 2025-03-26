import { IPost } from '../entities/post.entity';

export interface IPagination {
  limit: number;
  page: number;
}
export interface IPostsResponse {
  total: number;
  posts: IPost[];
}
export interface ICreatePost {
  text: string;
  originalPostId?: string;
  userId: string;
  sentiment: string;
}

export abstract class PostsRepository {
  abstract findPostsByUser(
    userId: string,
    pagination?: IPagination,
  ): Promise<IPostsResponse>;

  abstract findAll(pagination: IPagination): Promise<IPostsResponse>;

  abstract findByUserIds(
    userIds: string[],
    pagination: IPagination,
  ): Promise<IPostsResponse>;

  abstract create(createPostDto: ICreatePost): Promise<IPost>;

  abstract countTodayPosts(userId: string): Promise<number>;
}
