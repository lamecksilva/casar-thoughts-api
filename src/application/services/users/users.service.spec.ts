import { SuccessFollowResponseDto } from 'src/presentation/dtos/users/follow-user.dto';
import { ProfileDto } from 'src/presentation/dtos/users/profile.dto';
import { FollowUserUseCase } from '../../use-cases/followers/follow-user.use-case';
import { UnfollowUserUseCase } from '../../use-cases/followers/unfollow-user.use-case';
import { GetUserProfileUseCase } from '../../use-cases/users/get-user-profile.use-case';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let getProfileUseCase: jest.Mocked<GetUserProfileUseCase>;
  let followUserUseCase: jest.Mocked<FollowUserUseCase>;
  let unfollowUserUseCase: jest.Mocked<UnfollowUserUseCase>;

  beforeEach(() => {
    getProfileUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetUserProfileUseCase>;

    followUserUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<FollowUserUseCase>;

    unfollowUserUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<UnfollowUserUseCase>;

    usersService = new UsersService(
      getProfileUseCase,
      followUserUseCase,
      unfollowUserUseCase,
    );
  });

  it('should get user profile', async () => {
    const mockProfile: ProfileDto = {
      id: '123',
      username: 'fulano',
      displayName: 'fulano',
      memberSince: '01/01/2022',
      followers: 10,
      following: 5,
      posts: 3,
      isFollowing: false,
    };
    getProfileUseCase.execute.mockResolvedValue(mockProfile);

    const result = await usersService.getUserProfile('fulano', '456');

    expect(getProfileUseCase.execute).toHaveBeenCalledWith('fulano', '456');
    expect(result).toEqual(mockProfile);
  });

  it('should follow a user successfully', async () => {
    const mockResponse: SuccessFollowResponseDto = {
      success: true,
      message: 'User followed successfully',
    };
    followUserUseCase.execute.mockResolvedValue(mockResponse);

    const result = await usersService.followUser({
      followerId: 'user1',
      followingId: 'user2',
    });

    expect(followUserUseCase.execute).toHaveBeenCalledWith('user1', 'user2');
    expect(result).toEqual(mockResponse);
  });

  it('should unfollow a user successfully', async () => {
    const mockResponse: SuccessFollowResponseDto = {
      success: true,
      message: 'User unfollowed successfully',
    };
    unfollowUserUseCase.execute.mockResolvedValue(mockResponse);

    const result = await usersService.unfollowUser({
      followerId: 'user1',
      followingId: 'user2',
    });

    expect(unfollowUserUseCase.execute).toHaveBeenCalledWith('user1', 'user2');
    expect(result).toEqual(mockResponse);
  });
});
