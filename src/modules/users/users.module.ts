import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowersModule } from '../followers/followers.module';
import { GetUserProfileUseCase } from './application/use-cases/get-user-profile.use-case';
import { UserEntityTypeORM } from './domain/entities/user.entity';
import { UsersRepository } from './domain/repositories/users.repository';
import { UsersTypeORMRepository } from './domain/repositories/users_typeorm.repository';
import { UsersController } from './presentation/controllers/users.controller';
import { UsersService } from './users.service';
import { FollowUserUseCase } from '../followers/application/use-case/follow-user.use-case';

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
  ],
  exports: [UsersRepository],
})
export class UsersModule {}
