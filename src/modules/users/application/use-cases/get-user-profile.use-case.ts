import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from '../../domain/entities/user.entity';
import { UsersRepository } from '../../domain/repositories/users.repository';
import { ProfileDto } from '../dto/profile.dto';

@Injectable()
export class GetUserProfileUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    username: string,
    loggedUsername?: string,
  ): Promise<ProfileDto> {
    const user = await this.usersRepository.findByUsername(username);
    if (!user) {
      throw new NotFoundException(`User ${username} not found`);
    }

    return {
      username: user.username,
      memberSince: user.createdAt.toLocaleString('pt-BR'),
      followers: user.followers.length,
      following: user.following.length,
      posts: user.posts.length,
      isFollowing: this.checkIsFollowing(user.followers, loggedUsername),
    };
  }

  checkIsFollowing(followers: IUser[], username?: string): boolean {
    if (!username) return false;

    return followers.some((user: IUser) => user.username === username);
  }
}
