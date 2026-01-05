import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mailer/mailer.service';
import { Req__with__user } from 'src/interfaces/getUser.interface';
export declare class AuthService {
    private prisma;
    private jwt;
    private mailer;
    constructor(prisma: PrismaService, jwt: JwtService, mailer: MailerService);
    private generateToken;
    registerUser(data: RegisterDto): Promise<{
        message: string;
    }>;
    loginUser(data: LoginDto): Promise<{
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
