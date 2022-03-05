require("dotenv").config();
// const S3 = require("aws-sdk/clients/s3");
const AWS = require("aws-sdk");
const fs = require("fs");

//declare connection variables
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;
const version = process.env.AWS_VERSION;

//connect to S3
AWS.config.update({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  region: region,
});
const s3 = new AWS.S3();

const uploadFile = (image) => {
  const fileStream = fs.createReadStream(image.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: image.filename,
  };
  return s3.upload(uploadParams).promise();
};

const getImage = (key) => {
  const downloadParams = {
    Key: key,
    Bucket: bucketName,
  };
  return s3.getObject(downloadParams).createReadStream();
};

const deleteImage = (key) => {
  const deleteParams = {
    Key: key,
    Bucket: bucketName,
  };
  return s3.deleteObject(deleteParams).promise();
};

//export functions
exports.deleteImage = deleteImage;
exports.getImage = getImage;
exports.uploadFile = uploadFile;
