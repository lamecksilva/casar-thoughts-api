import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FollowEntityTypeORM } from 'src/domain/entities/followers.entity';
import { Repository } from 'typeorm';
import { FollowersTypeORMRepository } from './followers_typeorm.repository';

describe('FollowersTypeORMRepository', () => {
  let repository: FollowersTypeORMRepository;
  let followersRepository: jest.Mocked<Repository<FollowEntityTypeORM>>;

  beforeEach(async () => {
    const mockFollowersRepository: Partial<
      jest.Mocked<Repository<FollowEntityTypeORM>>
    > = {
      count: jest.fn(),
      insert: jest.fn(),
      delete: jest.fn(),
      createQueryBuilder: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest
          .fn()
          .mockResolvedValue([
            { followingId: 'user2' },
            { followingId: 'user3' },
          ]),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FollowersTypeORMRepository,
        {
          provide: getRepositoryToken(FollowEntityTypeORM),
          useValue: mockFollowersRepository,
        },
      ],
    }).compile();

    repository = module.get<FollowersTypeORMRepository>(
      FollowersTypeORMRepository,
    );
    followersRepository = module.get(getRepositoryToken(FollowEntityTypeORM));
  });

  it('should return true if user is following another user', async () => {
    followersRepository.count.mockResolvedValue(1);

    const result = await repository.isFollowing('user1', 'user2');

    expect(result).toBe(true);
    expect(followersRepository.count).toHaveBeenCalledWith({
      where: { followerId: 'user1', followingId: 'user2' },
    });
  });

  it('should return false if user is not following another user', async () => {
    followersRepository.count.mockResolvedValue(0);

    const result = await repository.isFollowing('user1', 'user2');

    expect(result).toBe(false);
  });

  it('should call insert to follow a user', async () => {
    await repository.followUser('user1', 'user2');

    expect(followersRepository.insert).toHaveBeenCalledWith({
      followerId: 'user1',
      followingId: 'user2',
    });
  });

  it('should call delete to unfollow a user', async () => {
    await repository.unfollowUser('user1', 'user2');

    expect(followersRepository.delete).toHaveBeenCalledWith({
      followerId: 'user1',
      followingId: 'user2',
    });
  });

  it('should return an array of followers IDs', async () => {
    const result = await repository.findFollowersIds('user1');

    expect(result).toEqual(['user2', 'user3']);
    expect(followersRepository.createQueryBuilder).toHaveBeenCalledWith(
      'followers',
    );
  });
});
