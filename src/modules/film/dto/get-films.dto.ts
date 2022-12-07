import { IsNumberString, IsOptional } from 'class-validator';

export class GetFilmsDto {
  @IsNumberString()
  @IsOptional()
  limit?: number;

  @IsNumberString()
  @IsOptional()
  offset?: number;
}
