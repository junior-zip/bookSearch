import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Livro } from './entities/livro.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class LivrosService {
  constructor(
    @InjectRepository(Livro)
    private readonly livroRepository: Repository<Livro>,
  ) {}

  errorLivros = () => {
    throw new NotFoundException('Erro não encontrado!');
  };

  async create(createLivroDto: CreateLivroDto) {
    try {
      const objectLivro = {
        ISBN: createLivroDto.ISBN,
        titulo: createLivroDto.titulo,
        descricao: createLivroDto.descricao,
        genero: createLivroDto.genero,
        dataPublicacao: createLivroDto.dataPublicacao,
        paginas: createLivroDto.paginas,
        imagem: createLivroDto?.imagem,
        idadeMin: createLivroDto?.idadeMin,
      };

      const createLivro = this.livroRepository.create(objectLivro);

      const saveLivro = this.livroRepository.save(createLivro);

      return saveLivro;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(paginationDto?: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto ?? {};

    const findLivros = await this.livroRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'desc',
      },
      select: {
        id: true,
        ISBN: true,
        genero: true,
        paginas: true,
        dataPublicacao: true,
        descricao: true,
        imagem: true,
        link: true,
        updatedAt: true,
        createdAt: true,
      },
    });

    if (!findLivros) return this.errorLivros();

    return findLivros;
  }

  async findOne(id: number) {
    const findLivros = await this.livroRepository.findOne({
      where: {
        id,
      },
      select: {
        id: true,
        ISBN: true,
        genero: true,
        paginas: true,
        dataPublicacao: true,
        descricao: true,
        imagem: true,
        link: true,
        updatedAt: true,
        createdAt: true,
      },
    });

    if (!findLivros) return this.errorLivros();

    return findLivros;
  }

  async update(id: number, updateLivroDto: UpdateLivroDto) {
    const objectLivro = {
      ISBN: updateLivroDto?.ISBN,
      titulo: updateLivroDto?.titulo,
      descricao: updateLivroDto?.descricao,
      genero: updateLivroDto?.genero,
      dataPublicacao: updateLivroDto?.dataPublicacao,
      paginas: updateLivroDto?.paginas,
      imagem: updateLivroDto?.imagem,
      idadeMin: updateLivroDto?.idadeMin,
      updatedAt: new Date(),
    };

    const findLivros = await this.livroRepository.preload({
      id,
      ...objectLivro,
    });

    if (!findLivros) return this.errorLivros();

    return this.livroRepository.save(findLivros);
  }

  async remove(id: number) {
    const findLivros = await this.livroRepository.findOne({
      where: {
        id,
      },
    });

    if (!findLivros) return this.errorLivros();

    await this.livroRepository.remove(findLivros);

    return findLivros;
  }
}
