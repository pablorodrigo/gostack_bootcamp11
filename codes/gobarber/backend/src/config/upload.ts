import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const tempFolder = path.resolve(__dirname, '..', '..', 'temp');
// const uploadsFolder = path.resolve(__dirname, '..', '..', 'temp', 'uploads');

export default {
  tempFolder,
  uploadsFolder: path.resolve(tempFolder, 'uploads'),

  // where it will be save
  storage: multer.diskStorage({
    destination: tempFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
