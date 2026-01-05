import { UserService } from './user.service';
import type { Req__with__user } from 'src/interfaces/getUser.interface';
import { UpdateUser } from './dto/update.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
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
    myProfile(req: Req__with__user): Promise<{
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
    updateOne(file: Express.Multer.File, req: Req__with__user, dto: UpdateUser): Promise<{
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
    deletOne(id: string): Promise<{
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
