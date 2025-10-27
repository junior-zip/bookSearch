import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';

@Controller('recommendations')
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Post()
  create(@Body() createRecommendationDto: CreateRecommendationDto) {
    return this.recommendationsService.create(createRecommendationDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.recommendationsService.findAll();
  }

  @Get('/destinatario/:id')
  findByDestinatarioId(@Param('id') id: number) {
    return this.recommendationsService.findByDestinatarioId(id);
  }

  @Get('/remetente/:id')
  findByRemetenteId(@Param('id') id: number) {
    return this.recommendationsService.findByRemetenteId(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.recommendationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateRecommendationDto: UpdateRecommendationDto,
  ) {
    return this.recommendationsService.update(id, updateRecommendationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recommendationsService.remove(id);
  }
}
