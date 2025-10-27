import { IsDate, IsEmail } from 'class-validator';
import { Recommendation } from 'src/recommendations/entities/recommendation.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Column({ length: 255, select: false })
  password: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  @IsDate()
  @Column({ type: 'date', nullable: true })
  birthday?: Date;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(
    () => Recommendation,
    (recommendation) => recommendation.destinatario,
  )
  destinatario: Recommendation[];

  @OneToMany(() => Recommendation, (recommendation) => recommendation.remetente)
  remetente: Recommendation[];
}
