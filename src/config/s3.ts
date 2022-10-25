import AWS from 'aws-sdk';

import awsConfig from "./aws";

const s3 = new AWS.S3(awsConfig);

export default s3;
