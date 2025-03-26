import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from './app.module';
import { FollowersModule } from './modules/followers/followers.module';
import { PostsModule } from './modules/posts/posts.module';
import { UsersModule } from './modules/users/users.module';

describe('AppModule', () => {
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should load the TypeOrmModule', () => {
    const typeOrmModule = app.get<TypeOrmModule>(TypeOrmModule);
    expect(typeOrmModule).toBeDefined();
  });

  it('should load PostsModule', () => {
    const postsModule = app.get<PostsModule>(PostsModule);
    expect(postsModule).toBeDefined();
  });

  it('should load UsersModule', () => {
    const usersModule = app.get<UsersModule>(UsersModule);
    expect(usersModule).toBeDefined();
  });

  it('should load FollowersModule', () => {
    const followersModule = app.get<FollowersModule>(FollowersModule);
    expect(followersModule).toBeDefined();
  });
});
