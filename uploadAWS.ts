import S3 from "aws-sdk/clients/s3";

const uploadToS3 = async (file) => {
  try {
    const s3 = new S3({
      accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
      secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
      region: `${process.env.AWS_REGION}`,
    });

    const params = {
      Bucket: `${process.env.AWS_BUCKET}`,
      Key: file.name,
      Body: file,
    };

    const uploadPromise = s3.upload(params).promise();

    uploadPromise.then(
      function(data) {
        console.log(`Successfully uploaded file to ${data.Location}`);
      },
      function(err) {
        console.error("Error uploading file to S3:", err);
      }
    );
  } catch (error) {
    console.error("Error uploading file to S3:", error);
  }
};

export default uploadToS3;
