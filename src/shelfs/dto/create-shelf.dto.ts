import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateShelfDto {
  @IsNotEmpty()
  @IsNumber()
  livro: number;

  @IsNotEmpty()
  @IsNumber()
  usuario: number;
}
