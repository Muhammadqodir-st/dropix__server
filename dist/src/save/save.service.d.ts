import { PrismaService } from 'src/prisma/prisma.service';
import { SaveDto } from './dto/save.dto';
export declare class SaveService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        save: {
            id: string;
            createdAt: Date;
            userId: string;
            postId: string;
        }[];
    }>;
    findById(userId: any): Promise<{
        save: {
            id: string;
            createdAt: Date;
            userId: string;
            postId: string;
        }[];
    }>;
    create(userId: any, data: SaveDto): Promise<{
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        message?: undefined;
    }>;
}
