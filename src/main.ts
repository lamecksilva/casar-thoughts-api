import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './infrastructure/server/plugins/swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  Logger.log(`Server running on port: ${PORT}`);
}
bootstrap();
