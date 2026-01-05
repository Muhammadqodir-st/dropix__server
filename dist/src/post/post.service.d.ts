import { AwsService } from 'src/common/aws/aws.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostService {
    private readonly aws;
    private readonly prisma;
    constructor(aws: AwsService, prisma: PrismaService);
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
    findById(id: string): Promise<{
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
    createPost(file: Express.Multer.File, userId: any, data: CreatePostDto): Promise<{
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
    update_post(): Promise<void>;
    deleteById(id: string, userId: any): Promise<{
        message: string;
        success: boolean;
    }>;
    deleteAll(): Promise<string>;
}
