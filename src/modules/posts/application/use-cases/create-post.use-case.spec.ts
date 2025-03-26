import { BadRequestException } from '@nestjs/common';
import { PostsRepository } from '../../domain/repositories/posts.repository';
import { TextProcessingService } from '../../text-processing.service';
import { CreatePostUseCase } from './create-post.use-case';
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

describe('CreatePostUseCase', () => {
  let createPostUseCase: CreatePostUseCase;
  let postsRepository: PostsRepository;
  let textProcessingService: TextProcessingService;

  beforeEach(() => {
    postsRepository = {
      countTodayPosts: jest.fn(),
      create: jest.fn(),
    } as any;
    textProcessingService = { analyzeText: jest.fn() } as any;
    createPostUseCase = new CreatePostUseCase(
      postsRepository,
      textProcessingService,
    );
  });

  it('should throw an BadRequest if post text and originalPostId are empty', async () => {
    const createPostDto = { text: '', originalPostId: null };
    await expect(
      createPostUseCase.execute(createPostDto, 'user1'),
    ).rejects.toThrow(new BadRequestException('Cannot create an empty post'));
  });

  it('should throw an BadRequest if 5 posts are already created today', async () => {
    const createPostDto = { text: 'Some post', originalPostId: null };
    jest.spyOn(postsRepository, 'countTodayPosts').mockResolvedValue(5);
    await expect(
      createPostUseCase.execute(createPostDto, 'user1'),
    ).rejects.toThrow(new BadRequestException('5 post day limit reached'));
  });

  describe('Text Processing ', () => {
    it('should call textProcessingService to analyze text when ALLOW_TEXT_PROCESSING is true', async () => {
      process.env.ALLOW_TEXT_PROCESSING = 'true';
      const createPostDto = { text: 'Great day!', originalPostId: null };
      const mockSentiment = 'positive';

      jest.spyOn(postsRepository, 'countTodayPosts').mockResolvedValue(3);
      jest
        .spyOn(textProcessingService, 'analyzeText')
        .mockResolvedValue(mockSentiment);
      jest.spyOn(postsRepository, 'create').mockResolvedValue({
        ...createPostDto,
        sentiment: mockSentiment,
        userId: 'user1',
        id: 'post1',
        user: mockUser,
        createdAt: new Date(),
      });

      const result = await createPostUseCase.execute(createPostDto, 'user1');

      expect(result.sentiment).toBe(mockSentiment);
      expect(postsRepository.create).toHaveBeenCalledWith({
        ...createPostDto,
        sentiment: mockSentiment,
        userId: 'user1',
      });
    });

    it('should set sentiment to "neutral" when ALLOW_TEXT_PROCESSING is false', async () => {
      process.env.ALLOW_TEXT_PROCESSING = 'false';
      const createPostDto = { text: 'Great day!', originalPostId: null };

      jest.spyOn(postsRepository, 'countTodayPosts').mockResolvedValue(3);
      jest.spyOn(postsRepository, 'create').mockResolvedValue({
        ...createPostDto,
        sentiment: 'neutral',
        userId: 'user1',
        id: 'post1',
        user: mockUser,
        createdAt: new Date(),
      });

      const result = await createPostUseCase.execute(createPostDto, 'user1');

      expect(result.sentiment).toBe('neutral');
      expect(postsRepository.create).toHaveBeenCalledWith({
        ...createPostDto,
        sentiment: 'neutral',
        userId: 'user1',
      });
    });
  });

  it('should successfully create a post if conditions are met', async () => {
    const createPostDto = { text: 'Great day!', originalPostId: null };
    const mockPost = {
      ...createPostDto,
      sentiment: 'neutral',
      userId: 'user1',
      id: 'post1',
      user: mockUser,
      createdAt: new Date(),
    };

    jest.spyOn(postsRepository, 'countTodayPosts').mockResolvedValue(3);
    jest.spyOn(postsRepository, 'create').mockResolvedValue(mockPost);

    const result = await createPostUseCase.execute(createPostDto, 'user1');

    expect(result).toEqual(mockPost);
    expect(postsRepository.create).toHaveBeenCalledWith({
      ...createPostDto,
      sentiment: 'neutral',
      userId: 'user1',
    });
  });
});
