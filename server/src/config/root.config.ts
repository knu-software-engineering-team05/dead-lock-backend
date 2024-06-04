import { ConfigModule } from '@nestjs/config';

export const RootConfigModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: `.${process.env.NODE_ENV}.env`,
});
