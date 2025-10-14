import { Module } from '@nestjs/common';
import { LivrosService } from './livros.service';
import { LivrosController } from './livros.controller';
import { Livro } from './entities/livro.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Livro])],
  controllers: [LivrosController],
  providers: [LivrosService],
  exports: [LivrosService],
})
export class LivrosModule {}
