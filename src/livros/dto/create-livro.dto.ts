import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateLivroDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  ISBN: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  titulo: string;

  @IsNotEmpty()
  @IsNumber()
  paginas: number;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsNotEmpty()
  genero: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dataPublicacao: Date;
}
