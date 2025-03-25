import { IPost } from '../entities/post.entity';

export interface IPagination {
  limit: number;
  page: number;
}
export interface IPostsResponse {
  total: number;
  posts: IPost[];
}

export abstract class PostsRepository {
  abstract findPostsByUser(
    userId: string,
    pagination?: IPagination,
  ): Promise<IPostsResponse>;
}
