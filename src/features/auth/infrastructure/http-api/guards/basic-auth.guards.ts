import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const {
      BASIC_AUTH_USER,
      BASIC_AUTH_PASS
    } = process.env;
    
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      throw new UnauthorizedException('Missing Basic Auth credentials');
    }

    // Decode base64 credentials
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    // Validate against env (or use a config service)
    if (
      username !== BASIC_AUTH_USER ||
      password !== BASIC_AUTH_PASS
    ) {
      throw new UnauthorizedException('Invalid Basic Auth credentials');
    }

    return true;
  }
}
