import { FollowersRepository } from 'src/modules/followers/domain/repositories/followers.repository';
import {
  IPostsResponse,
  PostsRepository,
} from '../../domain/repositories/posts.repository';
import { GetFeedUseCase } from './get-feed.use-case';
import { FeedType } from '../dto/feed.dto';
import { IPost } from '../../domain/entities/post.entity';
import { IUser } from 'src/modules/users/domain/entities/user.entity';

const mockUser: IUser = {
  id: '123',
  username: 'test',
  createdAt: new Date('2025-02-02'),
  displayName: 'test',
  following: [],
  followers: [],
  posts: [],
};
const mockPost: IPost = {
  id: 'post1',
  text: 'Post 1',
  userId: '123',
  user: mockUser,
  sentiment: 'pos',
  createdAt: new Date(),
};

describe('GetFeedUseCase', () => {
  let getFeedUseCase: GetFeedUseCase;
  let postsRepository: PostsRepository;
  let followersRepository: FollowersRepository;

  beforeEach(() => {
    postsRepository = {
      findByUserIds: jest.fn(),
      findAll: jest.fn(),
    } as any;
    followersRepository = {
      findFollowersIds: jest.fn(),
    } as any;
    getFeedUseCase = new GetFeedUseCase(postsRepository, followersRepository);
  });

  it('should return an empty feed when no followers are found', async () => {
    jest.spyOn(followersRepository, 'findFollowersIds').mockResolvedValue([]);
    const result = await getFeedUseCase.execute({
      type: FeedType.FOLLOWING,
      userId: 'user1',
      page: 1,
      limit: 10,
    });
    expect(result).toEqual({ total: 0, posts: [] });
  });

  it('should return posts of following users', async () => {
    const mockFollowingIds = ['user2', 'user3'];
    const mockPostsResponse: IPostsResponse = {
      total: 2,
      posts: [
        {
          ...mockPost,
          id: '1',
          userId: 'user2',
          user: { ...mockPost.user, id: 'user2' },
        },
        {
          ...mockPost,
          id: '2',
          userId: 'user3',
          user: { ...mockPost.user, id: 'user3' },
        },
      ],
    };
    jest
      .spyOn(followersRepository, 'findFollowersIds')
      .mockResolvedValue(mockFollowingIds);
    jest
      .spyOn(postsRepository, 'findByUserIds')
      .mockResolvedValue(mockPostsResponse);

    const result = await getFeedUseCase.execute({
      type: FeedType.FOLLOWING,
      userId: 'user1',
      page: 1,
      limit: 10,
    });

    expect(result).toEqual(mockPostsResponse);
    expect(followersRepository.findFollowersIds).toHaveBeenCalledWith('user1');
    expect(postsRepository.findByUserIds).toHaveBeenCalledWith(
      mockFollowingIds,
      { type: 'FOLLOWING', userId: 'user1', page: 1, limit: 10 },
    );
  });

  it('should return all posts when feed type is not FOLLOWING or ALL', async () => {
    const mockPostsResponse = {
      total: 3,
      posts: [
        { ...mockPost, id: '1' },
        { ...mockPost, id: '2' },
        { ...mockPost, id: '3' },
      ],
    };
    jest.spyOn(postsRepository, 'findAll').mockResolvedValue(mockPostsResponse);

    const result = await getFeedUseCase.execute({
      type: FeedType.ALL,
      userId: 'user1',
      page: 1,
      limit: 10,
    });

    expect(result).toEqual(mockPostsResponse);
    expect(postsRepository.findAll).toHaveBeenCalledWith({
      type: 'ALL',
      userId: 'user1',
      page: 1,
      limit: 10,
    });
  });
});
