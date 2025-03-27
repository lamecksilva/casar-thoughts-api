import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowersRepository } from 'src/domain/repositories/followers/followers.repository';
import { FollowersTypeORMRepository } from 'src/domain/repositories/followers/followers_typeorm.repository';
import { FollowEntityTypeORM } from '../../domain/entities/followers.entity';

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
