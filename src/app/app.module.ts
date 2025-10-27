import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { LivrosModule } from '../livros/livros.module';
import 'dotenv/config';
import { RecommendationsModule } from 'src/recommendations/recommendations.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.PORTDB),
      username: process.env.USERNAME,
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsuarioModule,
    LivrosModule,
    RecommendationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
