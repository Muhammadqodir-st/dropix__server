import { HttpException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mailer/mailer.service';
import { GetUser } from 'src/interfaces/getUser.interface';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private mailer: MailerService
    ) { }

    private generateToken(userId: string, email: string) {
        const token = this.jwt.sign({
            id: userId,
            email: email
        }, { secret: process.env.JWT_SECRET, expiresIn: '7d' });

        return token
    }

    // register user 
    async registerUser(data: RegisterDto) {
        const existEmail = await this.prisma.user.findUnique({
            where: { email: data.email }
        });

        if (existEmail) {
            throw new HttpException('User already exists, please login instead', 400)
        };

        const verifyToken = this.jwt.sign({
            name: data.name,
            email: data.email,
            method: "register"
        }, { secret: process.env.JWT_SECRET, expiresIn: '5m' });

        const link = `${process.env.FRONTEND_URL}/auth/verify?token=${verifyToken}`

        this.mailer.sendEmail(
            data.email,
            `<a href="${link}"><button style=" padding: 10px 18px; border-radius: 10px; background-color: #1d4ed8; border: 1px solid #2563eb; color: #fff; cursor: pointer; ">click to register</button></a>`
        );

        return {
            message: `Message sent to ${data.email}, please verify your email to complete registration`
        }
    }

    // login user
    async loginUser(data: LoginDto) {
        const existEmail = await this.prisma.user.findUnique({
            where: { email: data.email }
        });

        if (!existEmail) {
            throw new HttpException('User does not exist, please register instead', 404)
        }

        const verifyToken = this.jwt.sign({
            email: data.email,
            method: "login"
        }, { secret: process.env.JWT_SECRET, expiresIn: '5m' });

        const link = `${process.env.FRONTEND_URL}/auth/verify?token=${verifyToken}`

        this.mailer.sendEmail(
            data.email,
            `<a href="${link}"><button style=" padding: 10px 18px; border-radius: 10px; background-color: #1d4ed8; border: 1px solid #2563eb; color: #fff; cursor: pointer; ">click to login</button></a>`
        )

        return {
            message: `Message sent to ${data.email}, please verify your email to complete login`
        }
    };

    // verify user
    async verifyUser(token: string) {
        try {
            const data = this.jwt.verify(token, { secret: process.env.JWT_SECRET });

            if (!data) {
                throw new HttpException('Invalid token', 400)
            };


            // register
            if (data.method === "register") {
                const existEmail = await this.prisma.user.findUnique({
                    where: { email: data.email }
                });

                if (existEmail) {
                    throw new HttpException('User already exists, please login instead', 400)
                };

                const newUser = await this.prisma.user.create({
                    data: {
                        name: data.name,
                        email: data.email
                    }
                });

                if (!newUser) {
                    throw new HttpException('User registration failed', 500)
                }

                return { token: this.generateToken(newUser.id, newUser.email), success: true, message: "Creating account..." }
            }

            if (data.method === "login") {
                const user = await this.prisma.user.findUnique({
                    where: { email: data.email }
                });

                if (!user) {
                    throw new HttpException("User not found", 404);
                }

                return { token: this.generateToken(user.id, user.email), success: true, message: "Logging in, please wait..." }
            }
        } catch (error) {
            throw new HttpException("Invalid token", 400);
        }
    };


    // get user
    async getUser(req: GetUser) {
        const user = await this.prisma.user.findUnique({
            where: { email: req.user.email },
            include: { followers: true, following: true }
        });

        if (!user) {
            throw new HttpException('User not found', 404)
        }

        return { user: user, success: true }
    }
}