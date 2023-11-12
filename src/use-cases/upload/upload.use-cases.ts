import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUploadUseCases } from './upload.use-cases.interface';

@Injectable()
export class UploadUseCases implements IUploadUseCases {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  async uploadCsv(
    userId: string,
    projectId: string,
    fileName: string,
    file: Buffer,
  ) {
    const uploadedFile = await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'cyberpunkcsv',
        Key: fileName,
        Body: file,
      }),
    );
    return fileName;
  }
}
