// Configuration of AWS S3 Client
const awsConfig = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
  region: process.env.AWS_DEFAULT_REGION,
};

export default awsConfig;
