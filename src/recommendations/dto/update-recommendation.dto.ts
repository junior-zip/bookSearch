import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateRecommendationDto } from './create-recommendation.dto';

export class UpdateRecommendationDto extends PartialType(
  OmitType(CreateRecommendationDto, [
    'remetente',
    'livroId',
    'destinatario',
  ] as const),
) {}
