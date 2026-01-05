"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AwsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sharp_1 = __importDefault(require("sharp"));
const uuid_1 = require("uuid");
let AwsService = AwsService_1 = class AwsService {
    config;
    s3;
    logger = new common_1.Logger(AwsService_1.name);
    constructor(config) {
        this.config = config;
        const accessKeyId = this.config.get("AWS_ACCESS_KEY_ID");
        const secretAccessKey = this.config.get("AWS_SECRET_ACCESS_KEY");
        const region = this.config.get("AWS_REGION");
        if (!accessKeyId || !secretAccessKey || !region) {
            this.logger.log("AWS configuration is missing!");
            throw new Error("AWS configuration is incomplete.");
        }
        this.s3 = new client_s3_1.S3Client({
            region,
            credentials: {
                accessKeyId,
                secretAccessKey
            }
        });
    }
    ;
    async update__profile__image(file) {
        if (file.mimetype === "image/svg+xml") {
            this.logger.log(`Blocked attempt to upload SVG file: ${file.originalname}`);
            throw new common_1.HttpException('SVG files are not allowed for security reasons.', common_1.HttpStatus.BAD_REQUEST);
        }
        const fileName = `${(0, uuid_1.v4)()}.webp`;
        const bucket = this.config.get("AWS_S3_BUCKET_NAME");
        const region = this.config.get("AWS_REGION");
        if (!bucket) {
            this.logger.log("AWS_S3_BUCKET_NAME is not configured.");
            throw new common_1.HttpException("File upload configuration is incomplete.", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        ;
        this.logger.log(`Processing file: ${file.originalname} -> ${fileName}`);
        try {
            const optimizedBuffer = await (0, sharp_1.default)(file.buffer)
                .resize({ width: 500, height: 500, fit: "cover" })
                .toFormat('webp', { quality: 60 })
                .toBuffer();
            const command = new client_s3_1.PutObjectCommand({
                Bucket: bucket,
                Key: fileName,
                Body: optimizedBuffer,
                ContentType: 'image/webp'
            });
            this.logger.log(`Uploading ${fileName} to bucket ${bucket}...`);
            await this.s3.send(command);
            this.logger.log(`Successfully uploaded ${fileName}.`);
            const url = `https://${bucket}.s3.${region}.amazonaws.com/${fileName}`;
            return url;
        }
        catch (error) {
            this.logger.error(`Failed to upload file to S3: ${error.message}`, error.stack);
            throw new common_1.HttpException('An error occurred while uploading the file.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async upload__post__image(file) {
        if (!file) {
            throw new common_1.HttpException('No file provided', common_1.HttpStatus.BAD_REQUEST);
        }
        if (file.mimetype === "image/svg+xml") {
            this.logger.log(`Blocked attempt to upload SVG file: ${file.originalname}`);
            throw new common_1.HttpException('SVG files are not allowed for security reasons.', common_1.HttpStatus.BAD_REQUEST);
        }
        const fileName = `${(0, uuid_1.v4)()}.webp`;
        const bucket = this.config.get("AWS_S3_BUCKET_NAME");
        const region = this.config.get("AWS_REGION");
        if (!bucket) {
            this.logger.log("AWS_S3_BUCKET_NAME is not configured.");
            throw new common_1.HttpException("File upload configuration is incomplete.", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        ;
        this.logger.log(`Processing file: ${file.originalname} -> ${fileName}`);
        try {
            const optimizedBuffer = await (0, sharp_1.default)(file.buffer)
                .resize({ width: 500, fit: "cover" })
                .toFormat('webp', { quality: 60 })
                .toBuffer();
            const command = new client_s3_1.PutObjectCommand({
                Bucket: bucket,
                Key: fileName,
                Body: optimizedBuffer,
                ContentType: 'image/webp'
            });
            this.logger.log(`Uploading post image ${fileName} to bucket ${bucket}...`);
            await this.s3.send(command);
            this.logger.log(`Successfully uploaded ${fileName}.`);
            const url = `https://${bucket}.s3.${region}.amazonaws.com/${fileName}`;
            return url;
        }
        catch (error) {
            this.logger.error(`Failed to upload file to S3: ${error.message}`, error.stack);
            throw new common_1.HttpException('An error occurred while uploading the file.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AwsService = AwsService;
exports.AwsService = AwsService = AwsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AwsService);
//# sourceMappingURL=aws.service.js.map