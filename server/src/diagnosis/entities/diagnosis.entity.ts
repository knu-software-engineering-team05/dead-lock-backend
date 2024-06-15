import { IsInt, IsString } from 'class-validator';
import { UserModel } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum JobType {
  PRIVATE = 'PRIVATE',
  SELF_EMPLOYED = 'SELF_EMPLOYED',
  GOVT_JOB = 'GOVT_JOB',
  CHILDREN = 'CHILDREN',
  NEVER_WORKED = 'NEVER_WORKED',
}

export enum ResidenceType {
  URBAN = 'URBAN',
  RURAL = 'RURAL',
}

export enum SmokeType {
  FORMERLY = 'FORMERLY',
  NEVER = 'NEVER',
  SMOKES = 'SMOKES',
  UNKNOWN = 'UNKNOWN',
}

@Entity()
export class DiagnosisModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @IsInt()
  score: number;

  @Column()
  @IsInt()
  strokeProbability: number;

  @Column()
  @IsString()
  totalDiagnosis: string;

  @Column()
  @IsString()
  eatingHabits: string;

  @Column()
  @IsString()
  lifestyleHabits: string;

  @ManyToOne(() => UserModel, (user) => user.diagnosis)
  user: UserModel;
}
