import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { FilmField } from './types/film-field.type';
import { Film } from './types/film.type';

@Injectable()
export class GhibliService {
  constructor(private readonly httpService: HttpService) {}

  private static DEFAULT_FILM_FIELDS: FilmField[] = [
    'title',
    'original_title_romanised',
    'description',
    'release_date',
    'rt_score',
    'id',
  ];

  async listFilms(fields = GhibliService.DEFAULT_FILM_FIELDS, limit = 200): Promise<Film[] | null> {
    try {
      const { data } = await lastValueFrom(
        this.httpService.get<Film[]>('films', {
          params: { fields: fields.join(','), limit },
        }),
      );

      return data;
    } catch (e) {
      return null;
    }
  }
}
