import { ForbiddenException, ValidationPipe } from '@nestjs/common';

// Prevent user from update confidential fields such as: password, role, ...etc
// Only accept UserUpdateDTO format
export const UserValidationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
  validationError: {
    target: false,
  },
  validateCustomDecorators: true,
  skipMissingProperties: true,
  exceptionFactory: () => new ForbiddenException('Can not update fields that do not exist'),
});