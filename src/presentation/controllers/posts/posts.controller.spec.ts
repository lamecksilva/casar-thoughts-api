import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from 'src/application/services/posts/posts.service';
import { CreatePostDto } from 'src/presentation/dtos/posts/create-post.dto';
import {
  FeedPaginationDto,
  FeedParamsDto,
  FeedResponseDto,
  FeedType,
} from 'src/presentation/dtos/posts/feed.dto';
import { PostDto } from 'src/presentation/dtos/posts/post.dto';
import { PostsController } from './posts.controller';

describe('PostsController', () => {
  let postsController: PostsController;
  let postsService: PostsService;

  beforeEach(async () => {
    const mockPostsService = {
      getFeed: jest.fn(),
      getProfileFeed: jest.fn(),
      createPost: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [{ provide: PostsService, useValue: mockPostsService }],
    }).compile();

    postsController = module.get<PostsController>(PostsController);
    postsService = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(postsController).toBeDefined();
  });

  describe('feed', () => {
    it('should return feed posts', async () => {
      const feedParamsDto: FeedParamsDto = {
        type: FeedType.FOLLOWING,
        userId: 'user123',
        page: 1,
        limit: 10,
      };
      const feedResponse: FeedResponseDto = { total: 3, posts: [] };

      jest.spyOn(postsService, 'getFeed').mockResolvedValue(feedResponse);

      const result = await postsController.feed(feedParamsDto);

      expect(result).toEqual(feedResponse);
      expect(postsService.getFeed).toHaveBeenCalledWith(feedParamsDto);
    });
  });

  describe('feedByUser', () => {
    it('should return profile feed posts', async () => {
      const username = 'Edison56';
      const pagination: FeedPaginationDto = { page: 1, limit: 10 };
      const feedResponse: FeedResponseDto = { total: 5, posts: [] };

      jest
        .spyOn(postsService, 'getProfileFeed')
        .mockResolvedValue(feedResponse);

      const result = await postsController.feedByUser(username, pagination);

      expect(result).toEqual(feedResponse);
      expect(postsService.getProfileFeed).toHaveBeenCalledWith(
        username,
        pagination,
      );
    });
  });

  describe('create', () => {
    it('should create a post', async () => {
      const createPostDto: CreatePostDto = { text: 'Hello world' };
      const authenticatedUserId = 'user123';
      const postDto: PostDto = {
        id: 'post123',
        text: 'Hello world',
        userId: authenticatedUserId,
        user: {
          id: 'user123',
          createdAt: new Date('2025-02-02'),
          username: 'user',
          displayName: 'user',
          following: [],
          followers: [],
          posts: [],
        },
        createdAt: new Date(),
        sentiment: 'neutral',
      };

      jest.spyOn(postsService, 'createPost').mockResolvedValue(postDto);

      const result = await postsController.create(createPostDto, {
        authenticatedUserId,
      });

      expect(result).toEqual(postDto);
      expect(postsService.createPost).toHaveBeenCalledWith(
        createPostDto,
        authenticatedUserId,
      );
    });
  });
});
