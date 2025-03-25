import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetUserProfileUseCase } from './application/use-cases/get-user-profile.use-case';
import { UserEntityTypeORM } from './domain/entities/user.entity';
import { UsersTypeORMRepository } from './domain/repositories/users_typeorm.repository';
import { UsersController } from './presentation/controllers/users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './domain/repositories/users.repository';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([UserEntityTypeORM])],
  providers: [
    UsersTypeORMRepository,
    {
      provide: UsersRepository,
      useClass: UsersTypeORMRepository,
    },
    GetUserProfileUseCase,
    UsersService,
  ],
  exports: [UsersRepository],
})
export class UsersModule {}
