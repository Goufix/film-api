import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetFilmsDto } from './dto/get-films.dto';
import { Film } from './film.entity';
import { GetFilmsResponse } from './types/get-films.type';

@Injectable()
export class FilmService {
  constructor(@InjectRepository(Film) private readonly filmRepository: Repository<Film>) {}

  async getFilms(query: GetFilmsDto): Promise<GetFilmsResponse> {
    const [result, total] = await this.filmRepository.findAndCount({
      skip: query.offset,
      take: query.limit,
    });

    return { result, total };
  }
}
