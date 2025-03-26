import { Test, TestingModule } from '@nestjs/testing';
import { UserDto } from '../users/application/dto/user.dto';
import { CreatePostDto } from './application/dto/create-post.dto';
import {
  FeedPaginationDto,
  FeedParamsDto,
  FeedResponseDto,
  FeedType,
} from './application/dto/feed.dto';
import { PostDto } from './application/dto/post.dto';
import { CreatePostUseCase } from './application/use-cases/create-post.use-case';
import { GetFeedUseCase } from './application/use-cases/get-feed.use-case';
import { GetProfileFeedUseCase } from './application/use-cases/get-profile-feed.use-case';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  let getProfileFeedUseCase: jest.Mocked<GetProfileFeedUseCase>;
  let getFeedUseCase: jest.Mocked<GetFeedUseCase>;
  let createPostUseCase: jest.Mocked<CreatePostUseCase>;

  beforeEach(async () => {
    getProfileFeedUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetProfileFeedUseCase>;

    getFeedUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetFeedUseCase>;

    createPostUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<CreatePostUseCase>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: GetProfileFeedUseCase, useValue: getProfileFeedUseCase },
        { provide: GetFeedUseCase, useValue: getFeedUseCase },
        { provide: CreatePostUseCase, useValue: createPostUseCase },
      ],
    }).compile();

    postsService = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(postsService).toBeDefined();
  });

  it('should return profile feed', async () => {
    const username = 'john_doe';
    const pagination: FeedPaginationDto = { page: 1, limit: 10 };
    const feedResponse: FeedResponseDto = { total: 5, posts: [] };

    getProfileFeedUseCase.execute.mockResolvedValue(feedResponse);

    const result = await postsService.getProfileFeed(username, pagination);

    expect(result).toEqual(feedResponse);
    expect(getProfileFeedUseCase.execute).toHaveBeenCalledWith(
      username,
      pagination,
    );
  });

  it('should return feed', async () => {
    const feedParamsDto: FeedParamsDto = {
      type: FeedType.FOLLOWING,
      userId: 'user123',
      page: 1,
      limit: 10,
    };
    const feedResponse: FeedResponseDto = { total: 3, posts: [] };

    getFeedUseCase.execute.mockResolvedValue(feedResponse);

    const result = await postsService.getFeed(feedParamsDto);

    expect(result).toEqual(feedResponse);
    expect(getFeedUseCase.execute).toHaveBeenCalledWith(feedParamsDto);
  });

  it('should create a post', async () => {
    const createPostDto: CreatePostDto = { text: 'Hello world' };
    const userId = 'user123';
    const postDto: PostDto = {
      id: 'post123',
      text: 'Hello world',
      userId,
      user: new UserDto(),
      createdAt: undefined,
      sentiment: '',
    };

    createPostUseCase.execute.mockResolvedValue(postDto);

    const result = await postsService.createPost(createPostDto, userId);

    expect(result).toEqual(postDto);
    expect(createPostUseCase.execute).toHaveBeenCalledWith(
      createPostDto,
      userId,
    );
  });
});
