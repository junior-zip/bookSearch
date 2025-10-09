import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUsuarioDto extends PartialType(
  OmitType(CreateUsuarioDto, ['email'] as const),
) {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  birthday: Date;
}
