import { TestingModule, Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { List } from '../lists/entities/list.entity';
import { Task } from './entities/task.entity';
import { NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let taskService: TasksService;
  let listRepository: Repository<List>;
  let taskRepository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(List),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Task),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    taskService = module.get<TasksService>(TasksService);
    listRepository = module.get<Repository<List>>(getRepositoryToken(List));
    //userService = module.get<UsersService>(UsersService);
    taskRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  const mockUser = {
    id: 1,
    name: 'Test',
    email: 'test@example.com',
    username: 'test',
    password: 'examplePass123',
    lists: [],
  };

  const mockList = {
    id: 1,
    name: 'Test List',
    description: 'Test Description',
    user: mockUser,
    tasks: [],
  };

  const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'Test Task Description',
    list: mockList,
    completed: false,
    createdAt: new Date('2024-09-20T00:00:00Z'),
  };

  const createTaskDto = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    list: mockList.id,
  };

  describe('create', () => {
    it('should create a task for the specified list', async () => {
      jest.spyOn(listRepository, 'findOne').mockResolvedValue(mockList as List);
      jest.spyOn(taskRepository, 'save').mockResolvedValue(mockTask as Task);

      const result = await taskService.create(createTaskDto, mockUser.id);

      expect(listRepository.findOne).toHaveBeenCalledWith({
        where: { id: createTaskDto.list, user: { id: mockUser.id } },
        relations: ['user'],
      });
      expect(taskRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          title: createTaskDto.title,
          description: createTaskDto.description,
          list: mockList,
        }),
      );
      expect(result).toEqual(mockTask);
    });

    it('should throw NotFoundException when the list is not found', async () => {
      jest.spyOn(listRepository, 'findOne').mockResolvedValue(null);
      await expect(
        taskService.create(createTaskDto, mockUser.id),
      ).rejects.toThrow(NotFoundException);
      expect(listRepository.findOne).toHaveBeenCalledWith({
        where: { id: createTaskDto.list, user: { id: mockUser.id } },
        relations: ['user'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a task with specified id', async () => {
      jest
        .spyOn(taskRepository, 'findOne')
        .mockImplementationOnce(() => Promise.resolve(mockTask));
      const result = await taskService.findOne(mockTask.id);
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockTask.id },
        relations: ['list'],
      });
      expect(result).toEqual(mockTask);
    });
  });

  describe('findAll', () => {
    const secondMockTask = {
      id: 2,
      title: 'Test Task2',
      description: 'Test Task Description',
      list: mockList,
      completed: false,
      createdAt: new Date('2024-09-20T00:00:00Z'),
    };

    const newMockTasks = [mockTask, secondMockTask];
    it('should return an array of all task for specified list', async () => {
      jest
        .spyOn(taskRepository, 'find')
        .mockImplementationOnce(() => Promise.resolve(newMockTasks));
      const result = await taskService.findAll(mockUser.id);
      expect(taskRepository.find).toHaveBeenCalledWith({
        where: { list: { id: mockList.id } },
      });
      expect(result).toEqual(newMockTasks);
    });
  });

  describe('update', () => {
    const updateTaskDto = {
      title: 'Updated Task Name',
      description: 'Updated Task Description',
      completed: true,
      list: mockList.id,
    };

    it('should update an existing task', async () => {
      jest
        .spyOn(taskRepository, 'findOne')
        .mockResolvedValueOnce(mockTask as Task);
      jest.spyOn(taskRepository, 'update').mockResolvedValue(undefined);

      jest
        .spyOn(listRepository, 'findOneBy')
        .mockResolvedValue(mockList as List);

      const result = await taskService.update(
        mockTask.id,
        updateTaskDto,
        mockUser.id,
      );
      expect(listRepository.findOneBy).toHaveBeenCalledWith({
        id: updateTaskDto.list,
      });
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: mockTask.id,
          list: { id: updateTaskDto.list, user: { id: mockUser.id } },
        },
        relations: ['list'],
      });

      expect(taskRepository.update).toHaveBeenCalledWith(mockTask.id, {
        title: updateTaskDto.title,
        description: updateTaskDto.description,
        completed: updateTaskDto.completed,
        list: mockList,
      });
      expect(result).toEqual({ message: 'updatedSuccesfully' });
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      jest
        .spyOn(taskRepository, 'findOne')
        .mockImplementationOnce(() => Promise.resolve(mockTask));
      jest
        .spyOn(taskRepository, 'delete')
        .mockResolvedValue({ affected: 1 } as any);

      await taskService.remove(mockTask.id, mockUser.id);

      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockTask.id },
        relations: ['list', 'list.user'],
      });

      expect(taskRepository.delete).toHaveBeenCalledWith(mockTask.id);
    });
    it('should throw NotFoundException if the task does not exist or user does not have permission', async () => {
      const WrongMockUser = {
        id: 2,
        name: 'Test',
        email: 'test@example.com',
        username: 'test',
        password: 'examplePass123',
        lists: [],
      };
      const WrongMockList = {
        id: 1,
        name: 'Test List',
        description: 'Test Description',
        user: WrongMockUser,
        tasks: [],
      };
      const wrongMockTask = {
        id: 1,
        title: 'Test Task',
        description: 'Test Task Description',
        list: WrongMockList,
        completed: false,
        createdAt: new Date('2024-09-20T00:00:00Z'),
      };
      jest.spyOn(taskRepository, 'findOne').mockResolvedValue(wrongMockTask);

      await expect(
        taskService.remove(mockTask.id, mockUser.id),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
