import { Livro } from 'src/livros/entities/livro.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Recommendation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  usuarioId: Usuario;

  @ManyToOne(() => Livro, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @Column()
  livroId: Livro;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  lido: string;
}
