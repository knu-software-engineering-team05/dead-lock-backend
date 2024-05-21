import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/users/entities/user.entity';

const RootEntities = [UserModel];

export const TypeOrmRootModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    port: 5432,
    username: configService.get<string>('DB_USER_NAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: RootEntities,
    synchronize: true,
  }),
  inject: [ConfigService],
});
