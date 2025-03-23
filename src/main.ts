import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  Logger.log(`Server running on port: ${PORT}`);
}
bootstrap();

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Casar Thoughts API')
    .setDescription('Teste técnico')
    .setVersion('1.0')
    .addTag('thoughts')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
}
