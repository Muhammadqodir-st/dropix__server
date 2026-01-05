import { PrismaService } from 'src/prisma/prisma.service';
export declare class LikeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        like: {
            id: string;
            createdAt: Date;
            userId: string;
            postId: string;
        }[];
    }>;
    findById(postId: string): Promise<{
        likes: number;
    }>;
    createLike(postId: string, userId: string): Promise<{
        success: boolean;
        likes: number;
    }>;
}
