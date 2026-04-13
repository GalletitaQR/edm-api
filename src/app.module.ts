import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TaskModule } from './modules/tasks/tasks.module';
import { UserModule } from './user/users.module';
import { PrismaService } from './common/services/prisma.service';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './common/filters/http-exeption.filter';

@Module({
  imports: [AuthModule, TaskModule, UserModule, ],
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],

})
export class AppModule {}
