import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from 'src/application/services/posts/posts.service';
import { PostsRepository } from 'src/domain/repositories/posts/posts.repository';
import { PostsTypeORMRepository } from 'src/domain/repositories/posts/posts_typeorm.repository';
import { CreatePostUseCase } from '../../application/use-cases/posts/create-post.use-case';
import { GetFeedUseCase } from '../../application/use-cases/posts/get-feed.use-case';
import { GetProfileFeedUseCase } from '../../application/use-cases/posts/get-profile-feed.use-case';
import { PostEntityTypeORM } from '../../domain/entities/post.entity';
import { TextProcessingService } from '../../infrastructure/external-services/text-processing.service';
import { PostsController } from '../controllers/posts/posts.controller';
import { FollowersModule } from './followers.module';
import { UsersModule } from './users.module';

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
    PostsService,
    GetProfileFeedUseCase,
    GetFeedUseCase,
    TextProcessingService,
    CreatePostUseCase,
  ],
  exports: [PostsRepository],
})
export class PostsModule {}
