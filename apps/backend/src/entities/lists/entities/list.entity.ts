import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class List {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    description:string;

    @ManyToOne(() => User, (user) => user.lists, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => Task, (task) => task.list)
    tasks: Task[];
}
