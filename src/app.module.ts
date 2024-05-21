import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmRootModule } from './config/db.config';
import { RootConfigModule } from './config/root.config';

@Module({
  imports: [AuthModule, UsersModule, TypeOrmRootModule, RootConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
