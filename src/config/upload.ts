import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { randomBytes } from 'crypto';

// Defines the maximum size of the file (8Mb)
const AVATAR_MAX_SIZE = 8 * 1024 * 1024;

// Create and configures AWS S3 Client
const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
  region: process.env.AWS_DEFAULT_REGION,
});

const uploadConfig: multer.Options = {
  storage: multerS3({
    // AWS S3 Client
    s3: s3Client,
    // Bucket's name in AWS S3
    bucket: process.env.BUCKET_NAME as string,
    // File's content type
    contentType: multerS3.AUTO_CONTENT_TYPE,
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
