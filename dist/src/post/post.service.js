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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const aws_service_1 = require("../common/aws/aws.service");
const prisma_service_1 = require("../prisma/prisma.service");
let PostService = class PostService {
    aws;
    prisma;
    constructor(aws, prisma) {
        this.aws = aws;
        this.prisma = prisma;
    }
    async findAll() {
        try {
            return await this.prisma.post.findMany({
                include: { auther: true, likes: true, saves: true }
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async findById(id) {
        try {
            const post = await this.prisma.post.findUnique({
                where: { id },
                include: { auther: true, likes: true, comments: true }
            });
            if (!post) {
                throw new common_1.HttpException("Post not found!", 404);
            }
            ;
            return { post };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async createPost(file, userId, data) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) {
            throw new common_1.HttpException("User not found!", 404);
        }
        if (!file) {
            throw new common_1.HttpException("File not provided", 400);
        }
        const image = await this.aws.upload__post__image(file);
        try {
            const post = await this.prisma.post.create({
                data: {
                    title: data.title,
                    image: image,
                    autherId: userId
                }
            });
            return { post, message: "Post created", success: true };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async update_post() { }
    async deleteById(id, userId) {
        const post = await this.prisma.post.findUnique({
            where: { id }
        });
        if (!post) {
            throw new common_1.HttpException("Post not found!", 404);
        }
        if (post.autherId !== userId) {
            throw new common_1.HttpException("You are not creator of this post", 400);
        }
        try {
            const deleted__post = await this.prisma.post.delete({
                where: { id: post.id }
            });
            return { message: "Deleted post", success: true };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async deleteAll() {
        try {
            await this.prisma.post.deleteMany({});
            return "Deleted successfully";
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [aws_service_1.AwsService,
        prisma_service_1.PrismaService])
], PostService);
//# sourceMappingURL=post.service.js.map