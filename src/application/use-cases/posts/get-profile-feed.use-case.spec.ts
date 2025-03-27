import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IUser } from 'src/domain/entities/user.entity';
import { PostsRepository } from 'src/domain/repositories/posts/posts.repository';
import { UsersRepository } from 'src/domain/repositories/users/users.repository';
import { FeedResponseDto } from 'src/presentation/dtos/posts/feed.dto';
import { GetProfileFeedUseCase } from './get-profile-feed.use-case';

describe('GetProfileFeedUseCase', () => {
  let useCase: GetProfileFeedUseCase;
  let usersRepository: UsersRepository;
  let postsRepository: PostsRepository;

  const mockUser: IUser = {
    id: '123',
    username: 'test',
    createdAt: new Date('2025-02-02'),
    displayName: 'test',
    following: [],
    followers: [],
    posts: [],
  };
  const mockPostsResponse: FeedResponseDto = {
    total: 2,
    posts: [
      {
        id: 'post1',
        text: 'Post 1',
        userId: '123',
        user: mockUser,
        sentiment: 'pos',
        createdAt: new Date(),
      },
      {
        id: 'post2',
        text: 'Post 2',
        userId: '123',
        user: mockUser,
        sentiment: 'pos',
        createdAt: new Date(),
      },
    ],
  };

  const paginationMock = { page: 1, limit: 10 };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetProfileFeedUseCase,
        {
          provide: UsersRepository,
          useValue: { findByUsername: jest.fn() },
        },
        {
          provide: PostsRepository,
          useValue: { findPostsByUser: jest.fn() },
        },
      ],
    }).compile();

    useCase = module.get<GetProfileFeedUseCase>(GetProfileFeedUseCase);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    postsRepository = module.get<PostsRepository>(PostsRepository);
  });

  it('should return the profile feed of a user', async () => {
    jest.spyOn(usersRepository, 'findByUsername').mockResolvedValue(mockUser);
    jest
      .spyOn(postsRepository, 'findPostsByUser')
      .mockResolvedValue(mockPostsResponse);

    const result = await useCase.execute('test', paginationMock);

    expect(result).toEqual(mockPostsResponse);
    expect(usersRepository.findByUsername).toHaveBeenCalledWith('test');
    expect(postsRepository.findPostsByUser).toHaveBeenCalledWith(
      mockUser.id,
      paginationMock,
    );
  });

  it('should throw NotFound if user is not found', async () => {
    jest.spyOn(usersRepository, 'findByUsername').mockResolvedValue(null);

    await expect(useCase.execute('macbookPro', paginationMock)).rejects.toThrow(
      new NotFoundException('User macbookPro not found'),
    );
  });
});
