import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from 'src/domain/repositories/users/users.repository';
import { ProfileDto } from 'src/presentation/dtos/users/profile.dto';
import { IUser } from '../../../domain/entities/user.entity';

@Injectable()
export class GetUserProfileUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(username: string, loggedId?: string): Promise<ProfileDto> {
    const user = await this.usersRepository.findByUsername(username, {
      withRelations: true,
    });
    if (!user) {
      throw new NotFoundException(`User ${username} not found`);
    }

    return this.formatResponse(user, loggedId);
  }

  isFollowing(followers: IUser[], loggedId?: string): boolean {
    if (!loggedId) return false;

    return followers.some((user: IUser) => user.id === loggedId);
  }

  formatResponse(user: IUser, loggedId: string): ProfileDto {
    return {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      memberSince: user.createdAt.toLocaleDateString('pt-BR'),
      followers: user.followers?.length,
      following: user.following?.length,
      posts: user.posts?.length,
      isFollowing: this.isFollowing(user.followers, loggedId),
    };
  }
}
