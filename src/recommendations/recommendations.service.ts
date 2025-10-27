import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recommendation } from './entities/recommendation.entity';
import { LessThan, Repository } from 'typeorm';
import { LivrosService } from 'src/livros/livros.service';
import { UsuariosService } from 'src/usuario/usuario.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectRepository(Recommendation)
    private readonly recommendationRepository: Repository<Recommendation>,
    private readonly livrosService: LivrosService,
    private readonly usuariosService: UsuariosService,
  ) {}

  errorRecommendation = () => {
    throw new NotFoundException('Erro não encontrado!');
  };

  async create(createRecommendationDto: CreateRecommendationDto) {
    const { livroId, destinatario, remetente } = createRecommendationDto;

    if (destinatario == remetente)
      throw new Error('destinatario e remetente precisam ser diferentes!');

    const usuarioRemetente = await this.usuariosService.findOne(remetente);

    const usuarioDestinatario =
      await this.usuariosService.findOne(destinatario);

    const livro = await this.livrosService.findOne(livroId);

    if (!usuarioRemetente) throw new Error('Usuario remetente não encontrado!');

    if (!usuarioDestinatario)
      throw new Error('Usuario destinatario não encontrado!');

    if (!livro) throw new Error('Livro não encontrado!');

    const recommendationObject = {
      remetente: usuarioRemetente,
      destinatario: usuarioDestinatario,
      livro: livro,
      recado: createRecommendationDto.recado,
    };

    const createRecommendation =
      this.recommendationRepository.create(recommendationObject);

    await this.recommendationRepository.save(createRecommendation);

    return {
      livro: {
        id: livro.id,
        titulo: livro.titulo,
        descricao: livro.descricao,
        paginas: livro.paginas,
        recado: recommendationObject.recado,
      },
      Remetente: {
        id: usuarioRemetente.id,
        name: usuarioRemetente.name,
      },
      Destinatario: {
        id: usuarioDestinatario.id,
        nome: usuarioDestinatario.name,
      },
    };
  }

  async findByDestinatarioId(id: number) {
    const findRecommendation = await this.recommendationRepository.findOne({
      relations: ['remetente', 'destinatario', 'livro'],
      where: {
        destinatario: { id },
      },
    });

    if (!findRecommendation)
      throw new Error('Erro na busca por id do destinatario!');

    return {
      livro: {
        id: findRecommendation.livro.id,
        titulo: findRecommendation.livro.titulo,
        descricao: findRecommendation.livro.descricao,
        paginas: findRecommendation.livro.paginas,
        recado: findRecommendation.recado,
      },
      Remetente: {
        id: findRecommendation.remetente.id,
        name: findRecommendation.remetente.name,
      },
      Destinatario: {
        id: findRecommendation.destinatario.id,
        nome: findRecommendation.destinatario.name,
      },
    };
  }

  async findByRemetenteId(id: number) {
    const findRecommendation = await this.recommendationRepository.findOne({
      relations: ['remetente', 'destinatario', 'livro'],
      where: {
        remetente: { id },
      },
    });

    if (!findRecommendation)
      throw new Error('Erro na busca por id do Remetente!');

    return {
      livro: {
        id: findRecommendation.livro.id,
        titulo: findRecommendation.livro.titulo,
        descricao: findRecommendation.livro.descricao,
        paginas: findRecommendation.livro.paginas,
        recado: findRecommendation.recado,
      },
      Remetente: {
        id: findRecommendation.remetente.id,
        name: findRecommendation.remetente.name,
      },
      Destinatario: {
        id: findRecommendation.destinatario.id,
        nome: findRecommendation.destinatario.name,
      },
    };
  }

  async findAll(paginationDto?: PaginationDto) {
    const { limit = 5, cursor = 0 } = paginationDto ?? {};

    const where = cursor ? { id: LessThan(cursor) } : {};

    const recommendations = await this.recommendationRepository.find({
      where,
      take: limit,
      relations: ['remetente', 'destinatario', 'livro'],
      order: {
        id: 'desc',
      },
    });

    const nextCursor =
      recommendations.length > 0
        ? recommendations[recommendations.length - 1].id
        : null;

    return {
      ...recommendations,
      nextCursor,
      hasNextPage: recommendations.length === limit,
    };
  }

  async findOne(id: number) {
    const findRecommendation = await this.recommendationRepository.findOne({
      where: {
        id,
      },
      relations: ['remetente', 'destinatario', 'livro'],
    });

    if (!findRecommendation)
      throw new BadRequestException('Recommendation is not found!');

    return {
      livro: {
        id: findRecommendation.livro.id,
        titulo: findRecommendation.livro.titulo,
        descricao: findRecommendation.livro.descricao,
        paginas: findRecommendation.livro.paginas,
        recado: findRecommendation.recado,
      },
      Remetente: {
        id: findRecommendation.remetente.id,
        name: findRecommendation.remetente.name,
      },
      Destinatario: {
        id: findRecommendation.destinatario.id,
        nome: findRecommendation.destinatario.name,
      },
    };
  }

  async update(id: number, updateRecommendationDto: UpdateRecommendationDto) {
    const objRecomendation = {
      recado: updateRecommendationDto.recado,
    };

    const preLoadRecomendation = await this.recommendationRepository.preload({
      id: id,
      ...objRecomendation,
    });

    if (!preLoadRecomendation)
      throw new BadRequestException('Recommendation is not found!');

    return await this.recommendationRepository.save(preLoadRecomendation);
  }

  async remove(id: number) {
    const findRecommendation = await this.recommendationRepository.findOne({
      where: {
        id,
      },
      relations: ['remetente', 'destinatario', 'livro'],
    });

    if (!findRecommendation)
      throw new BadRequestException('Recommendation is not found!');

    await this.recommendationRepository.remove(findRecommendation);

    return {
      livro: {
        id: findRecommendation.livro.id,
        titulo: findRecommendation.livro.titulo,
        descricao: findRecommendation.livro.descricao,
        paginas: findRecommendation.livro.paginas,
        recado: findRecommendation.recado,
      },
      Remetente: {
        id: findRecommendation.remetente.id,
        name: findRecommendation.remetente.name,
      },
      Destinatario: {
        id: findRecommendation.destinatario.id,
        nome: findRecommendation.destinatario.name,
      },
    };
  }
}
