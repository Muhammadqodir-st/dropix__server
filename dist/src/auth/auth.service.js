"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const mailer_service_1 = require("../mailer/mailer.service");
let AuthService = class AuthService {
    prisma;
    jwt;
    mailer;
    constructor(prisma, jwt, mailer) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.mailer = mailer;
    }
    generateToken(userId, email) {
        const token = this.jwt.sign({
            id: userId,
            email: email
        }, { secret: process.env.JWT_SECRET, expiresIn: '7d' });
        return token;
    }
    async registerUser(data) {
        const existEmail = await this.prisma.user.findUnique({
            where: { email: data.email }
        });
        if (existEmail) {
            throw new common_1.HttpException('User already exists, please login instead', 400);
        }
        ;
        const verifyToken = this.jwt.sign({
            name: data.name,
            email: data.email,
            method: "register"
        }, { secret: process.env.JWT_SECRET, expiresIn: '5m' });
        const link = `${process.env.FRONTEND_URL}/auth/verify?token=${verifyToken}`;
        this.mailer.sendEmail(data.email, `<a href="${link}"><button style=" padding: 10px 18px; border-radius: 10px; background-color: #1d4ed8; border: 1px solid #2563eb; color: #fff; cursor: pointer; ">click to register</button></a>`);
        return {
            message: `Message sent to ${data.email}, please verify your email to complete registration`
        };
    }
    async loginUser(data) {
        const existEmail = await this.prisma.user.findUnique({
            where: { email: data.email }
        });
        if (!existEmail) {
            throw new common_1.HttpException('User does not exist, please register instead', 404);
        }
        const verifyToken = this.jwt.sign({
            email: data.email,
            method: "login"
        }, { secret: process.env.JWT_SECRET, expiresIn: '5m' });
        const link = `${process.env.FRONTEND_URL}/auth/verify?token=${verifyToken}`;
        this.mailer.sendEmail(data.email, `<a href="${link}"><button style=" padding: 10px 18px; border-radius: 10px; background-color: #1d4ed8; border: 1px solid #2563eb; color: #fff; cursor: pointer; ">click to login</button></a>`);
        return {
            message: `Message sent to ${data.email}, please verify your email to complete login`
        };
    }
    ;
    async verifyUser(token) {
        try {
            const data = this.jwt.verify(token, { secret: process.env.JWT_SECRET });
            if (!data) {
                throw new common_1.HttpException('Invalid token', 400);
            }
            ;
            if (data.method === "register") {
                const existEmail = await this.prisma.user.findUnique({
                    where: { email: data.email }
                });
                if (existEmail) {
                    throw new common_1.HttpException('User already exists, please login instead', 400);
                }
                ;
                const newUser = await this.prisma.user.create({
                    data: {
                        name: data.name,
                        email: data.email
                    }
                });
                if (!newUser) {
                    throw new common_1.HttpException('User registration failed', 500);
                }
                return { token: this.generateToken(newUser.id, newUser.email), success: true, message: "Creating account..." };
            }
            if (data.method === "login") {
                const user = await this.prisma.user.findUnique({
                    where: { email: data.email }
                });
                if (!user) {
                    throw new common_1.HttpException("User not found", 404);
                }
                return { token: this.generateToken(user.id, user.email), success: true, message: "Logging in, please wait..." };
            }
        }
        catch (error) {
            throw new common_1.HttpException("Invalid token", 400);
        }
    }
    ;
    async getUser(req) {
        const user = await this.prisma.user.findUnique({
            where: { email: req.user.email },
            include: { posts: true }
        });
        if (!user) {
            throw new common_1.HttpException('User not found', 404);
        }
        return { user: user, success: true };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        mailer_service_1.MailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map