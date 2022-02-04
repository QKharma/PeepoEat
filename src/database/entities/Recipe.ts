import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from './Tag';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  icon!: string;

  @Column('text')
  title!: string;

  @Column('text')
  description!: string;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags!: Tag[];
}
