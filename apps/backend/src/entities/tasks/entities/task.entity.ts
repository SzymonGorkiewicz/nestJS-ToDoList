import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { List } from '../../lists/entities/list.entity';

@Entity()
@Unique(['title', 'list'])
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => List, (list) => list.tasks, { onDelete: 'CASCADE' })
  list: List;
}
