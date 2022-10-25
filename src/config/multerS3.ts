import multer from 'multer';
import multerS3 from 'multer-s3';
import { randomBytes } from 'crypto';

import s3Client from './s3Client';

// Defines the maximum size of the file (8Mb)
const AVATAR_MAX_SIZE = 8 * 1024 * 1024;

const uploadConfig: multer.Options = {
  storage: multerS3({
    // AWS S3 Client
    s3: s3Client,
    // Bucket's name in AWS S3
    bucket: process.env.BUCKET_NAME as string,
    // File's content type
    contentType: multerS3.AUTO_CONTENT_TYPE,
    // Set Access Control Lists
    acl: 'public-read',
    // Set file's metadata
    metadata(_req, file, callback) {
      callback(null, { fieldName: file.fieldname });
    },
    // Set file's key
    key(_req, file, callback) {
      randomBytes(16, (err, hash) => {
        if (err) callback(err);

        file.filename = `users/avatars/${hash.toString("hex")}-${file.originalname}`;

        callback(null, file.filename);
      });
    },
  }),
  // Set the limit of file size (8Mb)
  limits: {
    fileSize: AVATAR_MAX_SIZE,
  },
};

export default uploadConfig;
