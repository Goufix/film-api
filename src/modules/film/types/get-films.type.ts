import { ApiProperty } from '@nestjs/swagger';
import { Film } from '../film.entity';

export class GetFilmsResponse {
  @ApiProperty({
    type: [Film],
  })
  result: Film[];

  @ApiProperty({
    type: Number,
  })
  total: number;
}
