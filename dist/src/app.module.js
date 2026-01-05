"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const prisma_module_1 = require("./prisma/prisma.module");
const mailer_module_1 = require("./mailer/mailer.module");
const user_module_1 = require("./user/user.module");
const config_1 = require("@nestjs/config");
const post_module_1 = require("./post/post.module");
const aws_module_1 = require("./common/aws/aws.module");
const like_module_1 = require("./like/like.module");
const comment_service_1 = require("./comment/comment.service");
const comment_module_1 = require("./comment/comment.module");
const save_module_1 = require("./save/save.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true
            }),
            auth_module_1.AuthModule,
            prisma_module_1.PrismaModule,
            mailer_module_1.MailerModule,
            user_module_1.UserModule,
            post_module_1.PostModule,
            aws_module_1.AwsModule,
            like_module_1.LikeModule,
            comment_module_1.CommentModule,
            save_module_1.SaveModule,
        ],
        providers: [comment_service_1.CommentService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map