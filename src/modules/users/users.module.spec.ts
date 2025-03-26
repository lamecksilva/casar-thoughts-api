import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowUserUseCase } from '../followers/application/use-case/follow-user.use-case';
import { UnfollowUserUseCase } from '../followers/application/use-case/unfollow-user.use-case';
import { FollowersModule } from '../followers/followers.module';
import { GetUserProfileUseCase } from './application/use-cases/get-user-profile.use-case';
import { UserEntityTypeORM } from './domain/entities/user.entity';
import { UsersRepository } from './domain/repositories/users.repository';
import { UsersTypeORMRepository } from './domain/repositories/users_typeorm.repository';
import { UsersController } from './presentation/controllers/users.controller';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';

describe('UsersModule', () => {
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [
        UsersModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'test',
          password: 'test',
          database: 'test_db',
          entities: [UserEntityTypeORM],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([UserEntityTypeORM]),
        FollowersModule,
      ],
    })
      .overrideProvider(UsersRepository)
      .useValue({})
      .compile();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should load the UsersController', () => {
    const controller = app.get<UsersController>(UsersController);
    expect(controller).toBeDefined();
  });

  it('should load the UsersService', () => {
    const service = app.get<UsersService>(UsersService);
    expect(service).toBeDefined();
  });

  it('should load the GetUserProfileUseCase', () => {
    const useCase = app.get<GetUserProfileUseCase>(GetUserProfileUseCase);
    expect(useCase).toBeDefined();
  });

  it('should load the FollowUserUseCase', () => {
    const useCase = app.get<FollowUserUseCase>(FollowUserUseCase);
    expect(useCase).toBeDefined();
  });

  it('should load the UnfollowUserUseCase', () => {
    const useCase = app.get<UnfollowUserUseCase>(UnfollowUserUseCase);
    expect(useCase).toBeDefined();
  });

  it('should load the UsersTypeORMRepository', () => {
    const repository = app.get<UsersTypeORMRepository>(UsersTypeORMRepository);
    expect(repository).toBeDefined();
  });

  it('should load the UsersRepository (mocked)', () => {
    const repository = app.get<UsersRepository>(UsersRepository);
    expect(repository).toBeDefined();
  });
});
