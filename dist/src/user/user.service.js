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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const aws_service_1 = require("../common/aws/aws.service");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    prisma;
    aws;
    constructor(prisma, aws) {
        this.prisma = prisma;
        this.aws = aws;
    }
    async findAll() {
        try {
            const users = await this.prisma.user.findMany();
            return { users };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getMyProfile(userId) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
                include: {
                    posts: {
                        include: { auther: true, likes: true, comments: true, saves: true }
                    },
                    saves: {
                        include: {
                            post: {
                                include: {
                                    auther: true, likes: true, comments: true, saves: true
                                }
                            }
                        }
                    },
                    likes: {
                        include: {
                            post: {
                                include: {
                                    auther: true, likes: true, comments: true, saves: true
                                }
                            }
                        }
                    },
                    comments: {
                        include: {
                            post: {
                                include: {
                                    auther: true, likes: true, comments: true, saves: true
                                }
                            },
                            user: true
                        }
                    }
                }
            });
            if (!user) {
                throw new common_1.HttpException('User not found', 404);
            }
            return { user };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: id },
                include: {
                    posts: {
                        include: { auther: true, likes: true, comments: true, saves: true }
                    },
                }
            });
            if (!user) {
                throw new common_1.HttpException('User not found', 404);
            }
            return { user };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateOne(data, file, req) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: req.user.id }
            });
            if (!user) {
                throw new common_1.HttpException('User not found', 404);
            }
            let avatar = user.avatar;
            if (file) {
                avatar = await this.aws.update__profile__image(file);
            }
            const update = await this.prisma.user.update({
                where: { id: user.id },
                data: { name: data.name, bio: data.bio, avatar }
            });
            return { success: true, user: update };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteOne(id) {
        try {
            const user = await this.prisma.user.delete({
                where: { id: id }
            });
            if (!user) {
                throw new common_1.HttpException('User not found', 404);
            }
            return { user, message: "User deleted", success: true };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        aws_service_1.AwsService])
], UserService);
//# sourceMappingURL=user.service.js.map