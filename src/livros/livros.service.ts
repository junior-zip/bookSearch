import { Injectable } from '@nestjs/common';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Livro } from './entities/livro.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LivrosService {
  constructor(
    @InjectRepository(Livro)
    private readonly livroRepository: Repository<Livro>,
  ) {}

  async create(createLivroDto: CreateLivroDto) {
    try {
      const objectLivro = {
        ISBN: createLivroDto.ISBN,
        titulo: createLivroDto.titulo,
        descricao: createLivroDto.descricao,
        genero: createLivroDto.genero,
        dataPublicacao: createLivroDto.dataPublicacao,
        paginas: createLivroDto.paginas,
      };

      const createLivro = this.livroRepository.create(objectLivro);

      const saveLivro = this.livroRepository.save(createLivro);

      return saveLivro;
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all livros`;
  }

  findOne(id: number) {
    return `This action returns a #${id} livro`;
  }

  update(id: number, updateLivroDto: UpdateLivroDto) {
    return updateLivroDto;
  }

  remove(id: number) {
    return `This action removes a #${id} livro`;
  }
}
