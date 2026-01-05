import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import type { Req__with__user } from 'src/interfaces/getUser.interface';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    findAll(): Promise<{
        comment: {
            id: string;
            createdAt: Date;
            text: string;
            userId: string;
            postId: string;
        }[];
    }>;
    findById(id: string): Promise<{
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
    createComment(id: string, dto: CommentDto, req: Req__with__user): Promise<{
        success: boolean;
        comment: {
            id: string;
            createdAt: Date;
            text: string;
            userId: string;
            postId: string;
        };
    }>;
    deleteById(id: string, req: Req__with__user): Promise<{
        success: boolean;
    }>;
}
