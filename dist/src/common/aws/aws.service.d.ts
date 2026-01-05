import { ConfigService } from '@nestjs/config';
export declare class AwsService {
    private readonly config;
    private readonly s3;
    private readonly logger;
    constructor(config: ConfigService);
    update__profile__image(file: Express.Multer.File): Promise<string>;
    upload__post__image(file: Express.Multer.File): Promise<string>;
}
