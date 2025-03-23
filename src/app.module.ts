import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntityTypeORM } from './users/domain/entities/user.entity';
import { PostEntityTypeORM } from './posts/domain/entities/post.entity';

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
      entities: [UserEntityTypeORM, PostEntityTypeORM],
      synchronize: process.env.NODE_ENV === 'development',
    }),
    UsersModule,
    // PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
