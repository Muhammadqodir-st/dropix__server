import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AwsModule } from '../common/aws/aws.module';

@Module({
  imports: [PrismaModule, AwsModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }
