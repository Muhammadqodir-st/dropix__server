import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { Req__with__user } from 'src/interfaces/getUser.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(dto: RegisterDto): Promise<{
        message: string;
    }>;
    loginUser(dto: LoginDto): Promise<{
        message: string;
    }>;
    verifyUser(token: string): Promise<{
        token: string;
        success: boolean;
        message: string;
    } | undefined>;
    getUser(req: Req__with__user): Promise<{
        user: {
            posts: {
                title: string | null;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                image: string;
                autherId: string;
            }[];
        } & {
            name: string;
            email: string;
            id: string;
            avatar: string;
            bio: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        success: boolean;
    }>;
}
