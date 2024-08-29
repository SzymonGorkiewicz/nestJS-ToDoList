import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { List } from '../../lists/entities/list.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @OneToMany(()=>List, (list) => list.user)
  lists: List[];
}