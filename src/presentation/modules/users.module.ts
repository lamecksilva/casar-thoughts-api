import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/application/services/users/users.service';
import { UsersRepository } from 'src/domain/repositories/users/users.repository';
import { UsersTypeORMRepository } from 'src/domain/repositories/users/users_typeorm.repository';
import { FollowUserUseCase } from '../../application/use-cases/followers/follow-user.use-case';
import { UnfollowUserUseCase } from '../../application/use-cases/followers/unfollow-user.use-case';
import { GetUserProfileUseCase } from '../../application/use-cases/users/get-user-profile.use-case';
import { UserEntityTypeORM } from '../../domain/entities/user.entity';
import { UsersController } from '../controllers/users/users.controller';
import { FollowersModule } from './followers.module';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([UserEntityTypeORM]), FollowersModule],
  providers: [
    UsersTypeORMRepository,
    {
      provide: UsersRepository,
      useClass: UsersTypeORMRepository,
    },
    UsersService,
    GetUserProfileUseCase,
    FollowUserUseCase,
    UnfollowUserUseCase,
  ],
  exports: [UsersRepository],
})
export class UsersModule {}
