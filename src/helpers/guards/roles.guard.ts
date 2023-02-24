import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {

    // Get list Role from @Role decorator
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      // That's public URL
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    const decoded = this.jwtService.decode(token)

    return roles.includes(decoded['role']);
  }
}