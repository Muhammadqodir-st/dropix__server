import { AwsService } from 'src/common/aws/aws.service';
import { Req__with__user } from 'src/interfaces/getUser.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUser } from './dto/update.dto';
export declare class UserService {
    private prisma;
    private aws;
    constructor(prisma: PrismaService, aws: AwsService);
    findAll(): Promise<{
        users: {
            name: string;
            email: string;
            id: string;
            avatar: string;
            bio: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    getMyProfile(userId: string): Promise<{
        user: {
            posts: ({
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
            })[];
            likes: ({
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
                };
            } & {
                id: string;
                createdAt: Date;
                userId: string;
                postId: string;
            })[];
            comments: ({
                user: {
                    name: string;
                    email: string;
                    id: string;
                    avatar: string;
                    bio: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                };
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
                };
            } & {
                id: string;
                createdAt: Date;
                text: string;
                userId: string;
                postId: string;
            })[];
            saves: ({
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
                };
            } & {
                id: string;
                createdAt: Date;
                userId: string;
                postId: string;
            })[];
        } & {
            name: string;
            email: string;
            id: string;
            avatar: string;
            bio: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    findOne(id: string): Promise<{
        user: {
            posts: ({
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
            })[];
        } & {
            name: string;
            email: string;
            id: string;
            avatar: string;
            bio: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    updateOne(data: UpdateUser, file: Express.Multer.File, req: Req__with__user): Promise<{
        success: boolean;
        user: {
            name: string;
            email: string;
            id: string;
            avatar: string;
            bio: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    deleteOne(id: string): Promise<{
        user: {
            name: string;
            email: string;
            id: string;
            avatar: string;
            bio: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        message: string;
        success: boolean;
    }>;
}
