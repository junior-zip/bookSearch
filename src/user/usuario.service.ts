import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
//import { UpdateUsuarioDto } from './dto/update-user.dto';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,
  ) {}

  async create(createUserDto: CreateUsuarioDto) {
    try {
      const createUser = {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
      };

      const newUser = this.userRepository.create(createUser);

      const saveUser = this.userRepository.save(newUser);

      return saveUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('E-mail já está cadastrado. ');
      }

      throw error;
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  /*
  update(id: number, updateUserDto: UpdateUsuarioDto) {
    return `This action updates a #${id} user`;
  }
  */

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
