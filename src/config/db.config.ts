import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/users/entities/user.entity';

const RootEntities = [UserModel];

export const TypeOrmRootModule = TypeOrmModule.forRoot({
  type: 'postgres',
  port: 5432,
  username: 'deadlock',
  password: 'deadlock',
  database: 'deadlock',
  entities: RootEntities,
  synchronize: true,
});
