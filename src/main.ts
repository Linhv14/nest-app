import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Set API Prefix except Login, Register URL
  app.setGlobalPrefix('api/v1', {
    exclude: [
      { path: 'login', method: RequestMethod.GET },
      { path: 'register', method: RequestMethod.POST }
    ]
  })

  // Add middleware so as to validation
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3000);

  console.log(`Application is running on: http://localhost:3000`)
}
bootstrap()