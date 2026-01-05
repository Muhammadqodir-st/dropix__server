import { PrismaService } from 'src/prisma/prisma.service';
import { CommentDto } from './dto/comment.dto';
export declare class CommentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        comment: {
            id: string;
            createdAt: Date;
            text: string;
            userId: string;
            postId: string;
        }[];
    }>;
    fintById(postId: string): Promise<{
        success: boolean;
        comment: ({
            user: {
                name: string;
                email: string;
                id: string;
                avatar: string;
                bio: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            text: string;
            userId: string;
            postId: string;
        })[];
    } | undefined>;
    createComment(postId: string, data: CommentDto, userId: string): Promise<{
        success: boolean;
        comment: {
            id: string;
            createdAt: Date;
            text: string;
            userId: string;
            postId: string;
        };
    }>;
    deleteById(commentId: any, userId: any): Promise<{
        success: boolean;
    }>;
}
