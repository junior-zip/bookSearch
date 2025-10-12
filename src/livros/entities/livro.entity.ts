import { IsDate } from 'class-validator';
import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class Livro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  titulo: string;

  @Column({ length: 255 })
  descricao: string;

  @Column({ length: 100 })
  genero: string;

  @Column({ length: 13 })
  ISBN: string;

  @Column()
  imagem: string;

  @Column()
  link: string;

  @Column({ length: 3 })
  IdadeMin: number;

  @Column({ length: 5 })
  paginas: number;

  @Column()
  @IsDate()
  @Column({ type: 'date', nullable: true })
  dataPublicacao: Date;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
