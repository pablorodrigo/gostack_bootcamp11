import fs from 'fs';
import path from 'path';
import mime from 'mime';
import aws, { S3 } from 'aws-sdk';
import uploadConfig from '@config/upload';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

export default class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_DEFAULT_REGION,
    });
  }

  async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tempFolder, file);

    const contentTypeFromFile = mime.getType(originalPath);

    if (!contentTypeFromFile) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: contentTypeFromFile,
      })
      .promise();

    // remove local file after upload to aws
    await fs.promises.unlink(originalPath);

    return file;
  }

  async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}
