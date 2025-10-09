import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUserDto: CreateUsuarioDto) {
    try {
      const createUser = {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
      };

      const newUser = this.usuarioRepository.create(createUser);

      const saveUser = this.usuarioRepository.save(newUser);

      return saveUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('E-mail já está cadastrado. ');
      }

      throw error;
    }
  }

  async findAll(paginationDto?: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto ?? {};

    const usuarios = await this.usuarioRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'desc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        birthday: true,
        password: false,
        createdAt: true,
        updatedAt: true,
      },
    });

    return usuarios;
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        id,
      },
      order: {
        id: 'desc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        birthday: true,
        password: false,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!usuario) throw new NotFoundException('Usuario não encontrado');

    return usuario;
  }

  async update(id: number, updateUserDto: UpdateUsuarioDto) {
    const date = new Date(updateUserDto?.birthday);
    date.setUTCHours(12); // força meio-dia UTC, evitando rollback de fuso horário

    const usuarioObject = {
      name: updateUserDto?.name,
      password: updateUserDto?.password,
      birthday: date,
      updatedAt: new Date(),
    };

    const findUsuario = await this.usuarioRepository.preload({
      id,
      ...usuarioObject,
    });

    if (!findUsuario) throw new NotFoundException('Usuario não encontrado');

    return await this.usuarioRepository.save(findUsuario);
  }

  async remove(id: number) {
    const findUsuario = await this.findOne(id);

    if (!findUsuario) throw new NotFoundException('Usuario não encontrado');

    const removeUsuario = await this.usuarioRepository.remove(findUsuario);

    return removeUsuario;
  }
}
