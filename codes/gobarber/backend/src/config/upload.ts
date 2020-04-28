import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

export default {
  // where it will be save
  storage: multer.diskStorage({}),
  destination: path.resolve(__dirname, '..', '..', 'temp', 'uploads'),
  filename(request, file, callback) {
    const fileHash = crypto.randomBytes(10).toString('HEX');
    const fileName = `${fileHash}-${file.originalname}`;

    return callback(null, fileName);
  },
};
