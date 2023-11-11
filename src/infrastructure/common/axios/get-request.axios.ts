import { ProcessedData } from '@/domain/models/processed-data';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AxiosGetService {
  constructor(private readonly httpService: HttpService) {}

  async axiosRequestOne<T>(
    config: AxiosRequestConfig,
    classType: new () => T,
    mappingStrategy: 'exposeAll' | 'excludeAll',
  ): Promise<T> {
    try {
      const axiosResponse: AxiosResponse<T> = await firstValueFrom(
        this.httpService.request<T>(config),
      );

      const mappedData = plainToClass(classType, axiosResponse.data, {
        strategy: mappingStrategy,
      });

      return mappedData;
    } catch (error) {
      if (error.isAxiosError) {
        throw new ProcessedData<T>(
          error.response?.status,
          error.message,
          0,
          [],
        );
      }

      throw error;
    }
  }

  async axiosRequestMany<T>(
    config: AxiosRequestConfig,
    classType: new () => T,
    mappingStrategy: 'exposeAll' | 'excludeAll',
  ): Promise<ProcessedData<T>> {
    try {
      const axiosResponse: AxiosResponse<T[]> = await firstValueFrom(
        this.httpService.request<T[]>(config),
      );

      let values: T[] | any;

      if (
        'values' in axiosResponse.data &&
        Array.isArray(axiosResponse.data.values)
      ) {
        values = axiosResponse.data.values;
      } else if (
        'issues' in axiosResponse.data &&
        Array.isArray(axiosResponse.data.issues)
      ) {
        values = axiosResponse.data.issues;
      } else if (Array.isArray(axiosResponse.data)) {
        values = axiosResponse.data;
      } else {
        values = [];
      }

      const mappedData = Array.isArray(values)
        ? values.map(data =>
            plainToClass(classType, data, {
              strategy: mappingStrategy,
            }),
          )
        : [plainToClass(classType, values, { strategy: 'excludeAll' })];

      return new ProcessedData<T>(
        axiosResponse.status,
        axiosResponse.statusText,
        values.length,
        mappedData,
      );
    } catch (error) {
      if (error.isAxiosError) {
        return new ProcessedData<T>(
          error.response?.status,
          error.message,
          0,
          [],
        );
      }

      throw error;
    }
  }
}
