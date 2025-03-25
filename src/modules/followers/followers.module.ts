import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowEntityTypeORM } from './domain/entities/followers.entity';
import { FollowersRepository } from './domain/repositories/followers.repository';
import { FollowersTypeORMRepository } from './domain/repositories/followers_typeorm.repository';

@Module({
  controllers: [],
  imports: [TypeOrmModule.forFeature([FollowEntityTypeORM])],
  providers: [
    FollowersTypeORMRepository,
    {
      provide: FollowersRepository,
      useClass: FollowersTypeORMRepository,
    },
  ],
  exports: [FollowersRepository],
})
export class FollowersModule {}
