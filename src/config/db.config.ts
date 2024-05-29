import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosisModel } from 'src/diagnosis/entities/diagnosis.entity';
import { UserModel } from 'src/users/entities/user.entity';

const RootEntities = [UserModel, DiagnosisModel];

export const TypeOrmRootModule_Production = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'sqlite',
    port: 5432,
    username: configService.get<string>('DB_USER_NAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: 'database.db',
    entities: RootEntities,
    synchronize: true,
  }),
  inject: [ConfigService],
});

export const TypeOrmRootModule_Develop = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'database.db',
  entities: RootEntities,
  synchronize: true,
});
