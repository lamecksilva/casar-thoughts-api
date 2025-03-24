import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';

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
      entities: [__dirname + 'src/modules/**/domain/**/*.entity{.ts,.js}'],
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
