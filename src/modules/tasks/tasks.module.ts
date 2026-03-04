import { Module } from '@nestjs/common';
import { TaskController } from './tasks.controller';
import { TaskService } from './tasks.service';
import { databaseProvider } from 'src/common/providers/database.provider';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, databaseProvider[0], PrismaService],
})
export class TaskModule {}
