import { Injectable, Logger } from '@nestjs/common';
import { GetUserProfileUseCase } from './application/use-cases/get-user-profile.use-case';

@Injectable()
export class UsersService {
  constructor(private getProfileUseCase: GetUserProfileUseCase) {}

  async getUserProfile(username: string) {
    Logger.log('Get user profile');
    return await this.getProfileUseCase.execute(username);
  }
}
