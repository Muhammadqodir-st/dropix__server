import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { HttpCode, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid'

@Injectable()
export class AwsService {
    private readonly s3: S3Client
    private readonly logger = new Logger(AwsService.name)
    constructor(private readonly config: ConfigService) {
        const accessKeyId = this.config.get("AWS_ACCESS_KEY_ID")
        const secretAccessKey = this.config.get("AWS_SECRET_ACCESS_KEY")
        const region = this.config.get("AWS_REGION")

        if (!accessKeyId || !secretAccessKey || !region) {
            this.logger.log("AWS configuration is missing!")
            throw new Error("AWS configuration is incomplete.")
        }

        this.s3 = new S3Client({
            region,
            credentials: {
                accessKeyId,
                secretAccessKey
            }
        })
    };

    async update__profile__image(file: Express.Multer.File) {
        if (file.mimetype === "image/svg+xml") {
            this.logger.log(`Blocked attempt to upload SVG file: ${file.originalname}`)
            throw new HttpException('SVG files are not allowed for security reasons.', HttpStatus.BAD_REQUEST)
        }

        const fileName = `${uuid()}.webp`;
        const bucket = this.config.get("AWS_S3_BUCKET_NAME");
        const region = this.config.get("AWS_REGION");

        if (!bucket) {
            this.logger.log("AWS_S3_BUCKET_NAME is not configured.")
            throw new HttpException("File upload configuration is incomplete.", HttpStatus.INTERNAL_SERVER_ERROR)
        };

        this.logger.log(`Processing file: ${file.originalname} -> ${fileName}`);

        try {
            const optimizedBuffer = await sharp(file.buffer)
                .resize({ width: 500, height: 500, fit: "cover" })
                .toFormat('webp', { quality: 60 })
                .toBuffer();

            const command = new PutObjectCommand({
                Bucket: bucket,
                Key: fileName,
                Body: optimizedBuffer,
                ContentType: 'image/webp'
            });

            this.logger.log(`Uploading ${fileName} to bucket ${bucket}...`)
            await this.s3.send(command)
            this.logger.log(`Successfully uploaded ${fileName}.`)

            const url = `https://${bucket}.s3.${region}.amazonaws.com/${fileName}`
            return url
        } catch (error) {
            this.logger.error(`Failed to upload file to S3: ${error.message}`, error.stack);
            throw new HttpException('An error occurred while uploading the file.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async upload__post__image(file: Express.Multer.File) {
        if (!file) {
            throw new HttpException('No file provided', HttpStatus.BAD_REQUEST)
        }

        if (file.mimetype === "image/svg+xml") {
            this.logger.log(`Blocked attempt to upload SVG file: ${file.originalname}`)
            throw new HttpException('SVG files are not allowed for security reasons.', HttpStatus.BAD_REQUEST)
        }

        const fileName = `${uuid()}.webp`;
        const bucket = this.config.get("AWS_S3_BUCKET_NAME");
        const region = this.config.get("AWS_REGION");

        if (!bucket) {
            this.logger.log("AWS_S3_BUCKET_NAME is not configured.")
            throw new HttpException("File upload configuration is incomplete.", HttpStatus.INTERNAL_SERVER_ERROR)
        };

        this.logger.log(`Processing file: ${file.originalname} -> ${fileName}`);

        try {
            const optimizedBuffer = await sharp(file.buffer)
                .resize({ width: 500, height: 360, fit: "cover" })
                .toFormat('webp', { quality: 60 })
                .toBuffer();

            const command = new PutObjectCommand({
                Bucket: bucket,
                Key: fileName,
                Body: optimizedBuffer,
                ContentType: 'image/webp'
            });

            this.logger.log(`Uploading post image ${fileName} to bucket ${bucket}...`)
            await this.s3.send(command)
            this.logger.log(`Successfully uploaded ${fileName}.`)

            const url = `https://${bucket}.s3.${region}.amazonaws.com/${fileName}`

            return url
        } catch (error) {
            this.logger.error(`Failed to upload file to S3: ${error.message}`, error.stack);
            throw new HttpException('An error occurred while uploading the file.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
