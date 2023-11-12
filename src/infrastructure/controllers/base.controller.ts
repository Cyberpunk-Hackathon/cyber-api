import { NotFoundException, Request } from '@nestjs/common';

export abstract class ControllerBase {
  protected getCloudId(@Request() request: any): string {
    const cloudId = request.headers['x-cloud-id'];

    if (!cloudId) {
      throw new NotFoundException('Cloud Id is missing');
    }
    return cloudId;
  }

  protected getAccessToken(@Request() request: any): string {
    const header = request.headers['authorization'];

    if (!header) {
      throw new NotFoundException('Authorization header is missing');
    }
    return header;
  }
}
