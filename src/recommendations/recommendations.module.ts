import { Module } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { RecommendationsController } from './recommendations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recommendation } from './entities/recommendation.entity';
import { LivrosModule } from 'src/livros/livros.module';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recommendation]),
    LivrosModule,
    UsuarioModule,
  ],
  controllers: [RecommendationsController],
  providers: [RecommendationsService],
  exports: [RecommendationsService],
})
export class RecommendationsModule {}
