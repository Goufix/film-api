import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GhibliService } from './ghibli.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: process.env.GHIBLI_API_URL,
    }),
  ],
  providers: [GhibliService],
  exports: [GhibliService],
})
export class GhibliModule {}
