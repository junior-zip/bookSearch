import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRecommendationDto {
  @IsNotEmpty()
  @IsNumber()
  remetente: number;

  @IsNotEmpty()
  @IsNumber()
  destinatario: number;

  @IsNotEmpty()
  @IsNumber()
  livroId: number;

  @IsOptional()
  @IsString()
  recado: string;
}
