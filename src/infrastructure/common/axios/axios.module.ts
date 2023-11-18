import { Module } from '@nestjs/common';
import { AxiosGetService } from './get-request.axios';
import { HttpModule } from '@nestjs/axios';
import { AxiosPostService } from './post-reqest.axios';

@Module({
  imports: [HttpModule],
  providers: [AxiosGetService, AxiosPostService],
  exports: [AxiosGetService, AxiosPostService],
})
export class AxiosModule {}
