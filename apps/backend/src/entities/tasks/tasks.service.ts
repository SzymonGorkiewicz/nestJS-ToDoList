import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { ListsService } from '../lists/lists.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from '../lists/entities/list.entity';


@Injectable()
export class TasksService {

  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>,
  @InjectRepository(List) private listRepository: Repository<List>, 
    private listService: ListsService
    ){}

  async create(createTaskDto: CreateTaskDto, userID:number) {
    const list = await this.listRepository.findOne({where: {id:createTaskDto.list, user:{id: userID}}, relations: ['user']})
    
    if (!list){
      throw new NotFoundException("List not found")
    }

    const task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.list = list

    return this.taskRepository.save(task);
  }

  findAll(listId:number) {
    return this.taskRepository.find({where: {list: {id:listId}}});
  }

  findOne(id: number) {
    return this.taskRepository.findOneBy({id:id});
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userID:number) {
    const task = await this.taskRepository.findOne({where: {id:id, list:{id:updateTaskDto.list,user:{id:userID}}}, relations: ['list']})

    const updatedFields: Partial<Task> = {};

    if(!task){
      throw new NotFoundException("Task not found")
    }

    if (updateTaskDto.title){
      updatedFields.title = updateTaskDto.title
    }

    if (updateTaskDto.description){
      updatedFields.description = updateTaskDto.description
    }

    if (updateTaskDto.list){
      const list = await this.listRepository.findOneBy({id:updateTaskDto.list})
      updatedFields.list = list
    }

    if (updateTaskDto.completed){
      updatedFields.completed = updateTaskDto.completed
    }
    
    await this.taskRepository.update(id,updatedFields)

    return this.taskRepository.findOneBy({id:id});
  }

  async remove(id: number, userID:number) {
    const task = await this.taskRepository.findOne({where: {id:id}, relations: ['list', 'list.user']})
    if (task.list.user.id !==userID){
      throw new NotFoundException("No permission")
    }

    return this.taskRepository.delete(id);
  }
}
