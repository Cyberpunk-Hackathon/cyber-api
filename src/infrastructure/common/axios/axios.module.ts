import { Module } from '@nestjs/common';
import { AxiosGetService } from './get-request.axios';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [AxiosGetService],
  exports: [AxiosGetService],
})
export class AxiosModule {}
