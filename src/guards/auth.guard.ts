import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization']

    if (!authHeader) {
      throw new UnauthorizedException('Token not found (no Authorization header)')
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token format')
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "yeeeeeeeeeeeeeeeduf") as any
      request.user = decoded
      return true;
    } catch (error) {
      throw new UnauthorizedException('The token is invalid or expired!')
    }
  }
}
