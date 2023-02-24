import { SetMetadata } from '@nestjs/common';

// Get list of Role from @Role decorator
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);