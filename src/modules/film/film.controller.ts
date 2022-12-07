import { Controller, Get, Query } from '@nestjs/common';
import { GetFilmsDto } from './dto/get-films.dto';
import { FilmService } from './film.service';

@Controller('film')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Get()
  getFilms(@Query() query: GetFilmsDto) {
    return this.filmService.getFilms(query);
  }
}
