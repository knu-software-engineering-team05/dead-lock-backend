import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosisModel } from 'src/diagnosis/entities/diagnosis.entity';
import { UserModel } from 'src/users/entities/user.entity';

const RootEntities = [UserModel, DiagnosisModel];

export const TypeOrmRootModule = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'database.db',
  entities: RootEntities,
  synchronize: true,
});
