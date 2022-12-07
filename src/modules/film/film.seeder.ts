import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GhibliService } from '../../external/ghibli/ghibli.service';
import { Film } from './film.entity';

@Injectable()
export class FilmSeeder implements OnModuleInit {
  private logger = new Logger(FilmSeeder.name);

  constructor(
    @InjectRepository(Film) private readonly filmRepository: Repository<Film>,
    private readonly ghibliService: GhibliService,
  ) {}

  async call() {
    this.logger.debug('Starting film seeder');
    const databaseFilms = await this.filmRepository.find({
      select: ['id', 'externalId'],
    });
    const databaseFilmsExternalIds = databaseFilms.map(({ externalId }) => externalId);
    const toCreateCount = Film.MAX_ENTITIES - databaseFilms.length;

    if (toCreateCount <= 0) {
      this.logger.debug('Entity limit reached, aborting seed');
      return;
    }

    this.logger.debug(`There are ${databaseFilms.length} films on the database`);

    const data = await this.ghibliService.listFilms();

    if (!data) {
      this.logger.error('Unable to fetch data, ghibli api could not be reached');

      if (!databaseFilms.length) {
        throw new Error('Unable to proceed, this api needs at least one film to work!');
      }

      return;
    }

    const toCreate = data.filter(
      (film, index) => index + 1 <= toCreateCount && !databaseFilmsExternalIds.includes(film.id),
    );

    const entities = toCreate.map<Partial<Film | false>>((film) => {
      return this.filmRepository.create({
        description: film.description,
        original_title: film.original_title_romanised,
        release_year: Number(film.release_date),
        score: Number(film.rt_score),
        title: film.title,
        externalId: film.id,
      });
    });

    this.logger.debug(`Seeding ${entities.length} films`);

    await this.filmRepository.save(entities as Film[]);

    this.logger.debug('Seeding complete!');
  }

  async onModuleInit() {
    await this.call();
  }
}
