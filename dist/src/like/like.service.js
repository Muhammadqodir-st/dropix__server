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
exports.LikeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LikeService = class LikeService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        try {
            const like = await this.prisma.like.findMany();
            return { like };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findById(postId) {
        try {
            const post = await this.prisma.post.findUnique({
                where: { id: postId }
            });
            if (!post) {
                throw new common_1.HttpException('Post not found', 404);
            }
            const count = await this.prisma.like.count({
                where: { postId }
            });
            return { likes: count };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createLike(postId, userId) {
        try {
            const post = await this.prisma.post.findUnique({
                where: { id: postId }
            });
            if (!post) {
                throw new common_1.HttpException('Post not found', 404);
            }
            const existing = await this.prisma.like.findFirst({
                where: { userId, postId }
            });
            if (existing) {
                await this.prisma.like.delete({
                    where: { id: existing.id }
                });
                const count = await this.prisma.like.count({
                    where: { postId }
                });
                return { success: false, likes: count };
            }
            await this.prisma.like.create({
                data: { userId, postId }
            });
            const count = await this.prisma.like.count({
                where: { postId }
            });
            return { success: true, likes: count };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
exports.LikeService = LikeService;
exports.LikeService = LikeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LikeService);
//# sourceMappingURL=like.service.js.map