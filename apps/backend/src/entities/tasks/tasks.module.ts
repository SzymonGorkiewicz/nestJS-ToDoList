import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { ListsModule } from '../lists/lists.module';
import { List } from '../lists/entities/list.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[ListsModule, TypeOrmModule.forFeature([Task, List]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
