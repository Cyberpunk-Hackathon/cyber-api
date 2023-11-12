import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import axios from 'axios';

@Injectable()
export class CloudIdGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const metadata = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (metadata) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const header = request.headers['authorization'];

    try {
      const response = await axios.get(
        'https://api.atlassian.com/oauth/token/accessible-resources',
        {
          headers: {
            Authorization: header,
          },
        },
      );

      if (response?.data[0]?.id) {
        request.headers['x-cloud-id'] = response.data[0].id;
        return true;
      }

      this.throwTenantForbiddenException();
      return false;
    } catch (error) {
      console.log('error :', error);
      this.throwTenantForbiddenException();
      return false;
    }
  }

  private throwTenantForbiddenException() {
    throw new HttpException('Unauthorized Tenant', HttpStatus.FORBIDDEN);
  }
}
