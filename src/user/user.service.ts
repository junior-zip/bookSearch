import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const createUser = {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        birthday: createUserDto.birthday,
        cpf: createUserDto.cpf,
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
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
  */

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
