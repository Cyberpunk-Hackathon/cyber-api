import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { JwksClient } from 'jwks-rsa';

@Injectable()
export class AuthGuard implements CanActivate {
  private jwksClient: JwksClient;

  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const header = request.headers['authorization'];

    if (!header) {
      this.throwUnauthorizedException();
      return false;
    }

    const [bearer, token] = header.split(' ');

    if (bearer !== 'Bearer' || !token) {
      this.throwUnauthorizedException();
      return false;
    }

    interface JWT {
      header: Object;
      payload: {
        jti: string;
      };
      signature: string;
    }

    const decodedToken = this.jwtService.decode(token, {
      complete: true,
    }) as JWT;

    if (!decodedToken?.payload?.jti) {
      this.throwUnauthorizedException();
      return false;
    }

    this.jwksClient = new JwksClient({
      jwksUri: `https://auth.atlassian.com/.well-known/jwks.json`,
    });

    try {
      const publicKey = await this.getPublicKey(token);
      if (publicKey.status === 'success' && publicKey.publicKey) {
        const options: JwtVerifyOptions = {
          publicKey: publicKey.publicKey,
          audience: this.configService.get<string>('CLIENT_ID'), // client id of the OAuth 3.L0 App
          issuer: `https://auth.atlassian.com`,
        };

        const payload = this.jwtService.verify(token, options);

        request.user = payload;

        return true;
      }
      this.throwUnauthorizedException();
      return false;
    } catch (error) {
      this.throwUnauthorizedException();
      return false;
    }
  }

  async getPublicKey(token: string): Promise<PublicKey> {
    try {
      if (!token) {
        return {
          status: 'success',
          publicKey: null,
          errorMessage: 'Token not found',
        };
      }

      interface Payload {
        header: {
          alg: string;
          kid: string;
          type: string;
          pc: string;
        };
        payload: any;
        signature: any;
      }

      const decodedToken = this.jwtService.decode(token, {
        complete: true,
      }) as Payload;

      const { header } = decodedToken;

      if (!decodedToken || !header || !header.kid) {
        return {
          status: 'error',
          publicKey: null,
          errorMessage: 'Invalid token',
        };
      }

      const signingKey = await this.getSigningKey(header.kid);
      const publicKey = signingKey.getPublicKey();

      return {
        status: 'success',
        publicKey: publicKey,
        errorMessage: null,
      };
    } catch (error) {
      return {
        status: 'error',
        publicKey: null,
        errorMessage: error.message,
      };
    }
  }

  private getSigningKey(kid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.jwksClient.getSigningKey(kid, (err, key) => {
        if (err) {
          reject(err);
        } else {
          resolve(key);
        }
      });
    });
  }

  private throwUnauthorizedException() {
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}

class PublicKey {
  status: string;
  publicKey: string | null;
  errorMessage: string | null;
}
