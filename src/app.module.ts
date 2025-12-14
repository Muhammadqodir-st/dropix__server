import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailerModule } from './mailer/mailer.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { AwsModule } from './common/aws/aws.module';
import { LikeModule } from './like/like.module';
import { CommentService } from './comment/comment.service';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    PrismaModule,
    MailerModule,
    UserModule,
    PostModule,
    AwsModule,
    LikeModule,
    CommentModule,
  ],
  providers: [CommentService],
})
export class AppModule { }
