import { config } from 'dotenv';
import { DataSource } from 'typeorm';
config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['**/*.entity.ts'],
  migrations: ['**/*-migration.ts'],
  migrationsRun: false,
  logging: true,
});

export default AppDataSource;
