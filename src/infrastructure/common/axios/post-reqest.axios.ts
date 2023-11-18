import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AxiosPostService {
  constructor(private readonly httpService: HttpService) {}
  async post(url: string, data: any): Promise<any> {
    try {
      const axiosResponse = await firstValueFrom(
        this.httpService.post(url, data),
      );
      return axiosResponse;
    } catch (error) {}
  }
}
