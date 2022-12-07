import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GhibliModule } from '../../external/ghibli/ghibli.module';
import { FilmController } from './film.controller';
import { Film } from './film.entity';
import { FilmSeeder } from './film.seeder';
import { FilmService } from './film.service';

@Module({
  imports: [GhibliModule, TypeOrmModule.forFeature([Film])],
  providers: [FilmService, FilmSeeder],
  controllers: [FilmController],
})
export class FilmModule {}
