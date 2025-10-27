import { Livro } from 'src/livros/entities/livro.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Shelf {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Livro, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'livro' })
  livro: Livro;

  @ManyToOne(() => Usuario, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'usuario' })
  usuario: Usuario;

  @Column({ type: 'tinyint' })
  lido: boolean;

  @Column({ type: 'decimal' })
  rating: number;

  @Column({ type: 'text' })
  comendatario: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
