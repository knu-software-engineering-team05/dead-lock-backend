import { DiagnosisModel } from 'src/diagnosis/entities/diagnosis.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn()
  userPk: number;

  @Column({ unique: true })
  userId: string;

  @Column()
  userPw: string;

  @Column()
  birth: string;

  @Column({ enum: Gender })
  gender: Gender;

  // @OneToMany(() => DiagnosisModel, (diagnosis) => diagnosis.user)
  // diagnosis: DiagnosisModel[];
}
