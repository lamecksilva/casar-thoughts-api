import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { IUser, UserEntityTypeORM } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersTypeORMRepository } from './users_typeorm.repository';

describe('UsersTypeORMRepository', () => {
  let repository: UsersTypeORMRepository;
  let userRepositoryMock: Repository<UserEntityTypeORM>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersTypeORMRepository,
        {
          provide: getRepositoryToken(UserEntityTypeORM),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = module.get<UsersTypeORMRepository>(UsersTypeORMRepository);
    userRepositoryMock = module.get<Repository<UserEntityTypeORM>>(
      getRepositoryToken(UserEntityTypeORM),
    );
  });

  it('Should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findById', () => {
    it('Should return a user by ID without relations', async () => {
      const userId = '123';
      const mockUser: IUser = {
        id: userId,
        username: 'testuser',
        createdAt: undefined,
        displayName: '',
        following: [],
        followers: [],
        posts: [],
      };

      jest.spyOn(userRepositoryMock, 'findOneBy').mockResolvedValue(mockUser);

      const result = await repository.findById(userId);
      expect(result).toEqual(mockUser);
      expect(userRepositoryMock.findOneBy).toHaveBeenCalledWith({ id: userId });
    });

    it('Should return a user by ID with relations', async () => {
      const userId = '123';
      const mockUser: IUser = {
        id: userId,
        username: 'testuser',
        following: [],
        followers: [],
        posts: [],
        createdAt: undefined,
        displayName: '',
      };

      jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValue(mockUser);

      const result = await repository.findById(userId, { withRelations: true });

      expect(result).toEqual(mockUser);
      expect(userRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: userId },
        relations: ['following', 'followers', 'posts'],
      });
    });
  });

  describe('findByUsername', () => {
    it('Should return a user by ID without relations', async () => {
      const username = 'testuser';
      const mockUser: IUser = {
        id: '123',
        username,
        createdAt: undefined,
        displayName: '',
        following: [],
        followers: [],
        posts: [],
      };

      jest.spyOn(userRepositoryMock, 'findOneBy').mockResolvedValue(mockUser);

      const result = await repository.findByUsername(username, {
        withRelations: false,
      });

      expect(result).toEqual(mockUser);
      expect(userRepositoryMock.findOneBy).toHaveBeenCalledWith({ username });
    });

    it('Should return a user by ID with relations', async () => {
      const username = 'testuser';
      const mockUser: IUser = {
        id: '123',
        username,
        following: [],
        followers: [],
        posts: [],
        createdAt: undefined,
        displayName: '',
      };

      jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValue(mockUser);

      const result = await repository.findByUsername(username, {
        withRelations: true,
      });

      expect(result).toEqual(mockUser);
      expect(userRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { username },
        relations: ['following', 'followers', 'posts'],
      });
    });

    it('Should return null when user not found', async () => {
      jest.spyOn(userRepositoryMock, 'findOneBy').mockResolvedValue(null);

      const result = await repository.findByUsername('nonexistentuser', {
        withRelations: false,
      });

      expect(result).toBeNull();
      expect(userRepositoryMock.findOneBy).toHaveBeenCalledWith({
        username: 'nonexistentuser',
      });
    });
  });
});
