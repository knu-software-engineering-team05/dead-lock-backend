import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmRootModule } from './config/db.config';
import { RootConfigModule } from './config/root.config';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DiagnosisModule,
    TypeOrmRootModule,
    RootConfigModule,
    OpenaiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
