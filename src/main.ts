import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000

  // Set API Prefix except Login, Register, Change-Pasword URL
  app.setGlobalPrefix('api/v1', {
    exclude: [
      { path: 'auth/login', method: RequestMethod.POST },
      { path: 'auth/register', method: RequestMethod.POST },
      { path: 'auth/change-password/:id', method: RequestMethod.PUT },
    ]
  })

  // Add middleware so as to validation
  app.useGlobalPipes(new ValidationPipe())


  await app.listen(PORT);

  console.log(`Application is running on: http://localhost:${PORT}`)
}
bootstrap()