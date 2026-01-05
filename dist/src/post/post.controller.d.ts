import { PostService } from './post.service';
import type { Req__with__user } from 'src/interfaces/getUser.interface';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    findAll(): Promise<({
        likes: {
            id: string;
            createdAt: Date;
            userId: string;
            postId: string;
        }[];
        saves: {
            id: string;
            createdAt: Date;
            userId: string;
            postId: string;
        }[];
        auther: {
            name: string;
            email: string;
            id: string;
            avatar: string;
            bio: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        title: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string;
        autherId: string;
    })[]>;
    findId(id: string): Promise<{
        post: {
            likes: {
                id: string;
                createdAt: Date;
                userId: string;
                postId: string;
            }[];
            comments: {
                id: string;
                createdAt: Date;
                text: string;
                userId: string;
                postId: string;
            }[];
            auther: {
                name: string;
                email: string;
                id: string;
                avatar: string;
                bio: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            title: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            image: string;
            autherId: string;
        };
    }>;
    createPost(file: Express.Multer.File, req: Req__with__user, dto: CreatePostDto): Promise<{
        post: {
            title: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            image: string;
            autherId: string;
        };
        message: string;
        success: boolean;
    }>;
    updateById(): void;
    deleteById(id: string, req: Req__with__user): Promise<{
        message: string;
        success: boolean;
    }>;
    deleteAll(): Promise<string>;
}
