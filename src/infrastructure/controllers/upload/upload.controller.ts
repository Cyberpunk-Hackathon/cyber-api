import { IUploadUseCases } from '@/use-cases/upload/upload.use-cases.interface';
import {
  Controller,
  FileTypeValidator,
  Inject,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ControllerBase } from '../base.controller';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
@ApiBearerAuth()
@ApiTags('upload')
export class UploadController extends ControllerBase {
  constructor(
    @Inject('IUploadUseCases')
    private readonly uploadUseCases: IUploadUseCases,
  ) {
    super();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload csv file' })
  async uploadCsv(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'csv' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Req() request: any,
  ) {
    await this.uploadUseCases.uploadCsv(
      'userId',
      'projectId',
      file.originalname,
      file.buffer,
    );
  }
}
