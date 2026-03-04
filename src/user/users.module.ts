import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { databaseProvider } from 'src/common/providers/database.provider';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, databaseProvider[0], PrismaService],
})
export class UserModule {}
