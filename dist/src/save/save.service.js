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
exports.SaveService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SaveService = class SaveService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        try {
            const save = await this.prisma.save.findMany();
            return { save };
        }
        catch (error) {
            throw new common_1.HttpException('Internal Server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findById(userId) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
                include: { saves: true }
            });
            if (!user) {
                throw new common_1.HttpException("User not found", 404);
            }
            return { save: user.saves };
        }
        catch (error) {
            throw new common_1.HttpException('Internal Server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(userId, data) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId }
            });
            if (!user) {
                throw new common_1.HttpException("User not found", 404);
            }
            const post = await this.prisma.post.findUnique({
                where: { id: data.postId }
            });
            if (!post) {
                throw new common_1.HttpException("Post not found", 404);
            }
            const existing = await this.prisma.save.findFirst({
                where: { userId, postId: data.postId }
            });
            if (existing) {
                await this.prisma.save.delete({
                    where: { id: existing.id }
                });
                return { message: 'deleted' };
            }
            const saved = await this.prisma.save.create({
                data: { userId, postId: post.id }
            });
            return { success: true };
        }
        catch (error) {
            throw new common_1.HttpException('Internal Server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.SaveService = SaveService;
exports.SaveService = SaveService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SaveService);
//# sourceMappingURL=save.service.js.map