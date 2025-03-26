import { BadRequestException } from '@nestjs/common';
import { FollowersRepository } from '../../domain/repositories/followers.repository';
import { UnfollowUserUseCase } from './unfollow-user.use-case';

describe('UnfollowUserUseCase', () => {
  let useCase: UnfollowUserUseCase;
  let followersRepository: jest.Mocked<FollowersRepository>;

  beforeEach(() => {
    followersRepository = {
      isFollowing: jest.fn(),
      unfollowUser: jest.fn(),
    } as unknown as jest.Mocked<FollowersRepository>;

    useCase = new UnfollowUserUseCase(followersRepository);
  });

  it('should throw error if is not following the user', async () => {
    followersRepository.isFollowing.mockResolvedValue(false);

    await expect(useCase.execute('user1', 'user2')).rejects.toThrow(
      BadRequestException,
    );
    await expect(useCase.execute('user1', 'user2')).rejects.toThrow(
      "You don't follow this user",
    );

    expect(followersRepository.isFollowing).toHaveBeenCalledWith(
      'user1',
      'user2',
    );
  });

  it('should unfollow the user successfully', async () => {
    followersRepository.isFollowing.mockResolvedValue(true);
    followersRepository.unfollowUser.mockResolvedValue();

    const result = await useCase.execute('user1', 'user2');

    expect(result).toEqual({
      success: true,
      message: 'User unfollowed successfully',
    });

    expect(followersRepository.isFollowing).toHaveBeenCalledWith(
      'user1',
      'user2',
    );
    expect(followersRepository.unfollowUser).toHaveBeenCalledWith(
      'user1',
      'user2',
    );
  });
});
