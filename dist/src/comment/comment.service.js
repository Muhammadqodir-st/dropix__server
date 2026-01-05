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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CommentService = class CommentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        try {
            const comments = await this.prisma.comment.findMany();
            return { comment: comments };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async fintById(postId) {
        try {
            const post = await this.prisma.post.findUnique({
                where: { id: postId }
            });
            if (!post) {
                throw new common_1.HttpException('Post not found', 404);
            }
            const comment = await this.prisma.comment.findMany({
                where: { postId: post.id },
                include: { user: true }
            });
            return { success: true, comment };
        }
        catch (error) {
        }
    }
    async createComment(postId, data, userId) {
        try {
            const post = await this.prisma.post.findUnique({
                where: { id: postId }
            });
            if (!post) {
                throw new common_1.HttpException('Post not found', 404);
            }
            const comment = await this.prisma.comment.create({
                data: { userId, postId: post.id, text: data.text }
            });
            return { success: true, comment };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteById(commentId, userId) {
        try {
            const comment = await this.prisma.comment.findUnique({
                where: { id: commentId }
            });
            if (!comment) {
                throw new common_1.HttpException('Comment not found', 404);
            }
            if (comment.userId !== userId) {
                throw new common_1.ForbiddenException('You cannot delete this comment');
            }
            await this.prisma.comment.delete({
                where: { id: commentId }
            });
            return { success: true };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentService);
//# sourceMappingURL=comment.service.js.map