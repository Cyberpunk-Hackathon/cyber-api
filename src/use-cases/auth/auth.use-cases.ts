import { BadRequestException, Injectable } from '@nestjs/common';
import { IAuthUseCases } from './auth.use-cases.interface';
import clerk, { OauthAccessToken } from '@clerk/clerk-sdk-node';

@Injectable()
export class AuthUseCases implements IAuthUseCases {
  async getJiraToken(userId: string) {
    try {
      const user: OauthAccessToken[] =
        await clerk.users.getUserOauthAccessToken(userId, 'oauth_atlassian');
      return user[0].token;
    } catch (error) {
      throw new BadRequestException('User not found');
    }
  }
}
