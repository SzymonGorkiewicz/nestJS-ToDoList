import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create')
  @UsePipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false }),
  )
  create(@Req() request, @Body() createTaskDto: CreateTaskDto) {
    const userID = request.decodedData.sub;
    return this.tasksService.create(createTaskDto, userID);
  }

  @Get(':id')
  findAll(@Param('id') listId: string) {
    return this.tasksService.findAll(+listId);
  }

  @Get('get/:id')
  findOne(@Param('id') taskID: string) {
    console.log('wchodzi');
    return this.tasksService.findOne(+taskID);
  }

  @Patch(':id')
  update(
    @Req() request,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const userID = request.decodedData.sub;
    return this.tasksService.update(+id, updateTaskDto, userID);
  }

  @Delete(':id')
  remove(@Req() request, @Param('id') id: string) {
    const userID = request.decodedData.sub;
    return this.tasksService.remove(+id, userID);
  }
}
