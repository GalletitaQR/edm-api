import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TaskModule } from './modules/tasks/tasks.module';
import { UserModule } from './user/users.module';

@Module({
  imports: [AuthModule, TaskModule, UserModule],
  
})
export class AppModule {}
