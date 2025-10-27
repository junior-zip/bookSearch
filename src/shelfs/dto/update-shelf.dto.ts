import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateShelfDto } from './create-shelf.dto';

export class UpdateShelfDto extends PartialType(
  OmitType(CreateShelfDto, ['livro', 'usuario'] as const),
) {}
