import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntityTypeORM } from './domain/entities/post.entity';
import { UserEntityTypeORM } from './domain/entities/user.entity';
import { FollowersModule } from './presentation/modules/followers.module';
import { PostsModule } from './presentation/modules/posts.module';
import { UsersModule } from './presentation/modules/users.module';

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
      migrations: ['dist/**/*-migration.js'],
      entities: [UserEntityTypeORM, PostEntityTypeORM],
      autoLoadEntities: true,
    }),
    PostsModule,
    UsersModule,
    FollowersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
