import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from 'src/domain/repositories/users/users.repository';
import { IUser } from '../../../domain/entities/user.entity';
import { GetUserProfileUseCase } from './get-user-profile.use-case';

const mockUser: IUser = {
  id: '123',
  username: 'test',
  displayName: 'test',
  createdAt: new Date('2025-02-03'),
  followers: [
    {
      id: '456',
      createdAt: new Date('2025-02-03'),
      username: 'Fulano',
      displayName: 'fulaninho',
      following: [],
      followers: [],
      posts: [],
    },
  ],
  following: [
    {
      id: '789',
      createdAt: new Date('2025-02-04'),
      username: 'ciclano',
      displayName: 'ciclano',
      following: [],
      followers: [],
      posts: [],
    },
  ],
  posts: [],
};

describe('GetUserProfileUseCase', () => {
  let getUserProfileUseCase: GetUserProfileUseCase;
  let usersRepository: jest.Mocked<UsersRepository>;

  beforeEach(async () => {
    const mockUsersRepository: Partial<UsersRepository> = {
      findByUsername: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserProfileUseCase,
        { provide: UsersRepository, useValue: mockUsersRepository },
      ],
    }).compile();

    getUserProfileUseCase = module.get<GetUserProfileUseCase>(
      GetUserProfileUseCase,
    );
    usersRepository = module.get(UsersRepository);
  });

  it('should return user profile when user exists', async () => {
    usersRepository.findByUsername.mockResolvedValue(mockUser);

    const profile = await getUserProfileUseCase.execute('test', '456');

    expect(profile).toEqual({
      id: '123',
      username: 'test',
      displayName: 'test',
      memberSince: '02/02/2025',
      followers: 1,
      following: 1,
      posts: 0,
      isFollowing: true,
    });
  });

  it('should throw NotFound when user not exist', async () => {
    usersRepository.findByUsername.mockResolvedValue(null);

    await expect(getUserProfileUseCase.execute('fulaninho23')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return isFollowing false when loggedId user is not following', async () => {
    mockUser.followers = [
      {
        id: '556',
        createdAt: new Date('2025-02-03'),
        username: 'Fulano2',
        displayName: 'fulaninho2',
        following: [],
        followers: [],
        posts: [],
      },
    ];
    usersRepository.findByUsername.mockResolvedValue(mockUser);

    const profile = await getUserProfileUseCase.execute('test', '456');

    expect(profile.isFollowing).toBe(false);
  });

  it('should return isFollowing false when not have value loggedId', async () => {
    usersRepository.findByUsername.mockResolvedValue(mockUser);

    const profile = await getUserProfileUseCase.execute('test');

    expect(profile.isFollowing).toBe(false);
  });
});
