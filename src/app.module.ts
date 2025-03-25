import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { UserEntityTypeORM } from './modules/users/domain/entities/user.entity';
import { PostEntityTypeORM } from './modules/posts/domain/entities/post.entity';
import { PostsModule } from './modules/posts/posts.module';
import { FollowersModule } from './modules/followers/followers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      migrations: [__dirname + 'src/infrastructure/database/migrations/*.ts'],
      entities: [UserEntityTypeORM, PostEntityTypeORM],
      autoLoadEntities: true,
    }),
    UsersModule,
    PostsModule,
    FollowersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
