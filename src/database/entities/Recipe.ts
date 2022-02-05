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

  @Column()
  icon!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags!: Tag[];
}
