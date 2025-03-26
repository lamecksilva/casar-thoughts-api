import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetProfileFeedUseCase } from './application/use-cases/get-profile-feed.use-case';
import { PostEntityTypeORM } from './domain/entities/post.entity';
import { PostsRepository } from './domain/repositories/posts.repository';
import { PostsTypeORMRepository } from './domain/repositories/posts_typeorm.repository';
import { PostsService } from './posts.service';
import { PostsController } from './presentation/controllers/posts.controller';
import { UsersModule } from '../users/users.module';
import { GetFeedUseCase } from './application/use-cases/get-feed.use-case';
import { FollowersModule } from '../followers/followers.module';

@Module({
  controllers: [PostsController],
  imports: [
    TypeOrmModule.forFeature([PostEntityTypeORM]),
    UsersModule,
    FollowersModule,
  ],
  providers: [
    PostsTypeORMRepository,
    {
      provide: PostsRepository,
      useClass: PostsTypeORMRepository,
    },
    GetProfileFeedUseCase,
    GetFeedUseCase,
    PostsService,
  ],
  exports: [PostsTypeORMRepository],
})
export class PostsModule {}
