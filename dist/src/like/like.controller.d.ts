import { LikeService } from './like.service';
import { LikeDto } from './dto/like.dto';
import type { Req__with__user } from 'src/interfaces/getUser.interface';
export declare class LikeController {
    private readonly likeService;
    constructor(likeService: LikeService);
    findAll(): Promise<{
        like: {
            id: string;
            createdAt: Date;
            userId: string;
            postId: string;
        }[];
    }>;
    findById(id: string): Promise<{
        likes: number;
    }>;
    createLike(dto: LikeDto, req: Req__with__user): Promise<{
        success: boolean;
        likes: number;
    }>;
}
