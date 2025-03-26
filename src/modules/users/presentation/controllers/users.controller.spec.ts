import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../../users.service';
import { ProfileDto } from '../../application/dto/profile.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { SuccessFollowResponseDto } from '../../application/dto/follow-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const mockUsersService = {
      getUserProfile: jest.fn(),
      followUser: jest.fn(),
      unfollowUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('Get profile ', () => {
    it('should return profile data for a valid username', async () => {
      const result: ProfileDto = {
        id: 'userId',
        displayName: 'edinho',
        username: 'Edison56',
        memberSince: '01/01/2020',
        followers: 10,
        following: 5,
        posts: 3,
        isFollowing: true,
      };

      jest.spyOn(usersService, 'getUserProfile').mockResolvedValue(result);

      const username = 'Edison56';
      const authenticatedUserId = 'authenticatedUserId';
      const response = await controller.findOne(username, {
        authenticatedUserId,
      });

      expect(response).toEqual(result);
      expect(usersService.getUserProfile).toHaveBeenCalledWith(
        username,
        authenticatedUserId,
      );
    });

    it('should throw NotFound if user not exist', async () => {
      const username = 'jorge';
      const authenticatedUserId = 'authenticatedUserId';

      jest
        .spyOn(usersService, 'getUserProfile')
        .mockRejectedValue(new NotFoundException(`User ${username} not found`));

      await expect(
        controller.findOne(username, { authenticatedUserId }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('followUser route', () => {
    it('should follow a user successfully', async () => {
      const followDto = {
        followerId: 'followerId',
        followingId: 'followingId',
      };

      const response: SuccessFollowResponseDto = {
        success: true,
        message: 'User followed successfully',
      };

      jest.spyOn(usersService, 'followUser').mockResolvedValue(response);

      const followingId = 'followingId';
      const authenticatedUserId = 'followerId';
      const query = { authenticatedUserId };

      const result = await controller.followUser(followingId, query);

      expect(result).toEqual(response);
      expect(usersService.followUser).toHaveBeenCalledWith(followDto);
    });

    it('should throw BadRequest if already following', async () => {
      jest
        .spyOn(usersService, 'followUser')
        .mockRejectedValue(
          new BadRequestException('You are already following this user'),
        );

      const followingId = 'followingId';
      const authenticatedUserId = 'followerId';
      const query = { authenticatedUserId };

      await expect(controller.followUser(followingId, query)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('unfollowUser route', () => {
    it('should unfollow a user successfully', async () => {
      const unfollowDto = {
        followerId: 'followerId',
        followingId: 'followingId',
      };

      const response: SuccessFollowResponseDto = {
        success: true,
        message: 'User unfollowed successfully',
      };

      jest.spyOn(usersService, 'unfollowUser').mockResolvedValue(response);

      const followingId = 'followingId';
      const authenticatedUserId = 'followerId';
      const query = { authenticatedUserId };

      const result = await controller.unfollowUser(followingId, query);

      expect(result).toEqual(response);
      expect(usersService.unfollowUser).toHaveBeenCalledWith(unfollowDto);
    });

    it('should throw BadRequest if not following the user', async () => {
      jest
        .spyOn(usersService, 'unfollowUser')
        .mockRejectedValue(
          new BadRequestException("You don't follow this user"),
        );

      const followingId = 'followingId';
      const authenticatedUserId = 'followerId';
      const query = { authenticatedUserId };

      await expect(controller.unfollowUser(followingId, query)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
