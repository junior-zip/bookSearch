import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Recommendation } from 'src/recommendations/entities/recommendation.entity';

@Entity()
export class Livro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 13 })
  ISBN: string;

  @Column({ length: 150 })
  titulo: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ length: 100 })
  genero: string;

  @Column({ nullable: true })
  imagem: string;

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  idadeMin: number;

  @Column()
  paginas: number;

  @Column({ type: 'date', nullable: true })
  dataPublicacao: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Recommendation, (recommendation) => recommendation.livro)
  recommendation: Recommendation;
}
