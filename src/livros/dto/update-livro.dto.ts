import { PartialType } from '@nestjs/mapped-types';
import { CreateLivroDto } from './create-livro.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateLivroDto extends PartialType(CreateLivroDto) {
  @IsOptional()
  @IsNumber()
  idadeMin: number;
}
