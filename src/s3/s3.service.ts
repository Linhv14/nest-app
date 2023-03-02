import { Injectable } from '@nestjs/common';
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';


// @Injectable()
// export class S3Service {
//     private s3: S3Client;

//     constructor() {
//         this.s3 = new S3Client({
//             region: process.env.AWS_REGION,
//             credentials: {
//                 accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//                 secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//             },
//         });
//     }

//     async getObject(key: string): Promise<Readable> {
//         const command = new GetObjectCommand({
//             Bucket: process.env.AWS_BUCKET_NAME,
//             Key: key,
//         });

//         const response = await this.s3.send(command);

//         return response.Body as Readable;
//     }

//     async putObject(key: string, body: Readable): Promise<void> {
//         const command = new PutObjectCommand({
//             Bucket: process.env.AWS_BUCKET_NAME,
//             Key: key,
//             Body: body,
//         });

//         await this.s3.send(command);
//     }
// }

// export class S3Services {
//     private s3Client: S3;
  
//     constructor() {
//       this.s3Client = new S3();
//     }
  
//     async uploadFileToS3(file: any, bucketName: string): Promise<string> {
//       const params = {
//         Bucket: bucketName,
//         Key: file.originalname,
//         Body: file.buffer,
//       };
//       const result = await this.s3Client.upload(params).promise();
//       return result.Location;
//     }
  
//     async getObjectUrl(bucketName: string, objectKey: string): Promise<string> {
//       const url = await this.s3Client.getObjectUrl(bucketName, objectKey);
//       return url;
//     }
//   }

@Injectable()
export class S3Service {
  private s3: S3;

  constructor() {
    this.s3 = new S3();
  }

  async uploadFile(file): Promise<string> {
    const fileStream = Readable.from(file.buffer);
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${uuidv4()}-${file.originalname}`,
      Body: fileStream,
    };

    const uploadedFile = await this.s3.upload(params).promise();
    const url = await this.getFileUrl(uploadedFile.Key);

    return url
  }

  async getFileUrl(key: string): Promise<string> {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    };

    const url = await this.s3.getSignedUrlPromise('getObject', params);

    return url;
  }
}