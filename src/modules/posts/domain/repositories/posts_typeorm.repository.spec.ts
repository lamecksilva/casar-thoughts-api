import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPost, PostEntityTypeORM } from '../entities/post.entity';
import { ICreatePost, IPagination, IPostsResponse } from './posts.repository';
import { PostsTypeORMRepository } from './posts_typeorm.repository';
import { IUser } from 'src/modules/users/domain/entities/user.entity';

const mockUser: IUser = {
  id: '123',
  username: 'test',
  createdAt: new Date('2025-02-02'),
  displayName: '',
  following: [],
  followers: [],
  posts: [],
};

describe('PostsTypeORMRepository', () => {
  let repository: PostsTypeORMRepository;
  let postsRepository: Repository<PostEntityTypeORM>;

  beforeEach(async () => {
    const mockPostsRepository = {
      createQueryBuilder: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsTypeORMRepository,
        {
          provide: getRepositoryToken(PostEntityTypeORM),
          useValue: mockPostsRepository,
        },
      ],
    }).compile();

    repository = module.get<PostsTypeORMRepository>(PostsTypeORMRepository);
    postsRepository = module.get<Repository<PostEntityTypeORM>>(
      getRepositoryToken(PostEntityTypeORM),
    );
  });

  describe('findPostsByUser', () => {
    it('should return posts by user with pagination', async () => {
      const pagination: IPagination = { page: 1, limit: 5 };
      const userId = 'userId';
      const postsResponse: IPostsResponse = {
        total: 2,
        posts: [
          {
            id: '1',
            text: 'Post 1',
            createdAt: new Date(),
            userId,
            user: mockUser,
            sentiment: '',
          },
          {
            id: '2',
            text: 'Post 2',
            createdAt: new Date(),
            userId,
            user: mockUser,
            sentiment: '',
          },
        ],
      };

      const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest
          .fn()
          .mockResolvedValue([postsResponse.posts, postsResponse.total]),
      };

      jest
        .spyOn(postsRepository, 'createQueryBuilder')
        .mockReturnValue(mockQueryBuilder as any);

      const result = await repository.findPostsByUser(userId, pagination);

      expect(result).toEqual(postsResponse);
      expect(postsRepository.createQueryBuilder).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all posts with pagination', async () => {
      const pagination: IPagination = { page: 1, limit: 10 };
      const postsResponse: IPostsResponse = {
        total: 3,
        posts: [
          {
            id: '1',
            text: 'Post 1',
            createdAt: new Date(),
            userId: '',
            user: mockUser,
            sentiment: '',
          },
          {
            id: '2',
            text: 'Post 2',
            createdAt: new Date(),
            userId: '',
            user: mockUser,
            sentiment: '',
          },
          {
            id: '3',
            text: 'Post 3',
            createdAt: new Date(),
            userId: '',
            user: {
              ...mockUser,
              id: '1234',
            },
            sentiment: '',
          },
        ],
      };

      const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest
          .fn()
          .mockResolvedValue([postsResponse.posts, postsResponse.total]),
      };

      jest
        .spyOn(postsRepository, 'createQueryBuilder')
        .mockReturnValue(mockQueryBuilder as any);

      const result = await repository.findAll(pagination);

      expect(result).toEqual(postsResponse);
      expect(postsRepository.createQueryBuilder).toHaveBeenCalled();
    });
  });

  describe('findByUserIds', () => {
    it('should return posts for multiple users ids with pagination', async () => {
      const pagination: IPagination = { page: 1, limit: 10 };
      const userIds = ['user1', 'user2'];
      const postsResponse: IPostsResponse = {
        total: 3,
        posts: [
          {
            id: '1',
            text: 'Post 1',
            createdAt: new Date(),
            userId: 'user2',
            user: {
              ...mockUser,
              id: 'user2',
            },
            sentiment: '',
          },
          {
            id: '2',
            text: 'Post 2',
            createdAt: new Date(),
            userId: 'user1',
            user: {
              ...mockUser,
              id: 'user1',
            },
            sentiment: '',
          },
          {
            id: '3',
            text: 'Post 3',
            createdAt: new Date(),
            userId: 'user2',
            user: {
              ...mockUser,
              id: 'user2',
            },
            sentiment: '',
          },
        ],
      };

      const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest
          .fn()
          .mockResolvedValue([postsResponse.posts, postsResponse.total]),
      };

      jest
        .spyOn(postsRepository, 'createQueryBuilder')
        .mockReturnValue(mockQueryBuilder as any);

      const result = await repository.findByUserIds(userIds, pagination);

      expect(result).toEqual(postsResponse);
      expect(postsRepository.createQueryBuilder).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a post and return', async () => {
      const createPostDto: ICreatePost = {
        text: 'New post',
        userId: 'userId',
        sentiment: 'neutral',
      };

      const post: IPost = {
        id: '1',
        text: 'New post',
        createdAt: new Date(),
        userId: 'userId',
        sentiment: 'pos',
        user: mockUser,
        originalPostId: null,
      };

      jest.spyOn(postsRepository, 'create').mockReturnValue(post);
      jest.spyOn(postsRepository, 'save').mockResolvedValue(post);

      const result = await repository.create(createPostDto);

      expect(result).toEqual(post);
      expect(postsRepository.save).toHaveBeenCalledWith(post);
    });
  });

  describe('countTodayPosts', () => {
    it('should return the count of posts created today by user', async () => {
      const userId = 'userId';
      const countResponse = { count: '5' };

      const mockQueryBuilder = {
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue(countResponse),
      };

      jest
        .spyOn(postsRepository, 'createQueryBuilder')
        .mockReturnValueOnce(mockQueryBuilder as any);

      const result = await repository.countTodayPosts(userId);

      expect(result).toBe(5);
      expect(postsRepository.createQueryBuilder).toHaveBeenCalled();
    });
  });
});
