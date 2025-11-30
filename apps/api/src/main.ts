// apps/api/src/main.ts
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // parse cookies (if you need them)
  app.use(cookieParser());

  // Enable CORS for local dev so preflight (OPTIONS) returns correct headers
  app.enableCors({
    origin: 'http://localhost:3000', // change if frontend runs on a different host/port
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // global validation pipe (kept as you had)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // Global Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Start server (use PORT env if provided, otherwise 8000)
  await app.listen(process.env.PORT ? Number(process.env.PORT) : 8000);
}
bootstrap();
