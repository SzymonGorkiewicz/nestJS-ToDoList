import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { List } from '../../lists/entities/list.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => List, (list) => list.user)
  lists: List[];
}
