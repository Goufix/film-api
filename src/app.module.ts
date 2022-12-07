import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { GhibliModule } from './external/ghibli/ghibli.module';
import { FilmModule } from './modules/film/film.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_URL,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
    GhibliModule,
    FilmModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
