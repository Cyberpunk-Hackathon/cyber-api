export interface IUploadUseCases {
  uploadCsv(
    userId: string,
    projectId: string,
    fileName: string,
    file: Buffer,
  ): Promise<string>;
}
