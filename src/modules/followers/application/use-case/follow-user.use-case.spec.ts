import { BadRequestException } from '@nestjs/common';
import { FollowersRepository } from '../../domain/repositories/followers.repository';
import { FollowUserUseCase } from './follow-user.use-case';

describe('FollowUserUseCase', () => {
  let useCase: FollowUserUseCase;
  let followersRepository: jest.Mocked<FollowersRepository>;

  beforeEach(() => {
    followersRepository = {
      isFollowing: jest.fn(),
      followUser: jest.fn(),
    } as unknown as jest.Mocked<FollowersRepository>;

    useCase = new FollowUserUseCase(followersRepository);
  });

  it('should throw an error if the user tries to follow herself', async () => {
    await expect(useCase.execute('user1', 'user1')).rejects.toThrow(
      BadRequestException,
    );
    await expect(useCase.execute('user1', 'user1')).rejects.toThrow(
      "You can't follow yourself",
    );
  });

  it('should throw an error if the user is already following the user', async () => {
    followersRepository.isFollowing.mockResolvedValue(true);

    await expect(useCase.execute('user1', 'user2')).rejects.toThrow(
      BadRequestException,
    );
    await expect(useCase.execute('user1', 'user2')).rejects.toThrow(
      'You is already following this user',
    );

    expect(followersRepository.isFollowing).toHaveBeenCalledWith(
      'user1',
      'user2',
    );
  });

  it('should follow the user successfully', async () => {
    followersRepository.isFollowing.mockResolvedValue(false);
    followersRepository.followUser.mockResolvedValue();

    const result = await useCase.execute('user1', 'user2');

    expect(result).toEqual({
      success: true,
      message: 'User followed successfully',
    });

    expect(followersRepository.isFollowing).toHaveBeenCalledWith(
      'user1',
      'user2',
    );
    expect(followersRepository.followUser).toHaveBeenCalledWith(
      'user1',
      'user2',
    );
  });
});
