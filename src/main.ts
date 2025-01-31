import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { appLogger } from './logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(appLogger), // Integrando o WinstonLogger ao NestJS
  });

  await app.listen(3000);
}

bootstrap();
