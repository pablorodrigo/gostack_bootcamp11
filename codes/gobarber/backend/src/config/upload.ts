import path from 'path';
import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';

const tempFolder = path.resolve(__dirname, '..', '..', 'temp');
// const uploadsFolder = path.resolve(__dirname, '..', '..', 'temp', 'uploads');

interface IUploadConfig {
  driver: 's3' | 'diskStorage';
  tempFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    diskStorage: {};
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tempFolder,
  uploadsFolder: path.resolve(tempFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tempFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('HEX');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },

  config: {
    diskStorage: {},
    aws: {
      bucket: 'gobarber-app-test-2020',
    },
  },
} as IUploadConfig;
