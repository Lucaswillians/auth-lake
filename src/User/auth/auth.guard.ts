
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstant } from './auth.constants';

@Injectable()
export class AuthGuard implements CanActivate {
@Inject() 
private jwtService: JwtService

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
   
    if (!token) throw new UnauthorizedException('Token is required!');

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: jwtConstant.secret });
      request['user'] = payload;
    } 
    catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
