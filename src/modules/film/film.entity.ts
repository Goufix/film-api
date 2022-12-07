import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  original_title: string;

  @Column()
  description: string;

  @Column()
  release_year: number;

  @Column()
  score: number;

  @Column()
  externalId: string;

  public static MAX_ENTITIES = 200;
}
