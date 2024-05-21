import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  age: number;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;
}
