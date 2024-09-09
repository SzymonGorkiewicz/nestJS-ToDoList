import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Unique,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
@Unique(['name', 'user'])
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.lists, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Task, (task) => task.list)
  tasks: Task[];
}
