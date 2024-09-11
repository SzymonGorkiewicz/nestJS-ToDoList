import { Test, TestingModule } from '@nestjs/testing';
import { ListsService } from './lists.service';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('ListsService', () => {
  let listService: ListsService;
  let repository: Repository<List>;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListsService,
        UsersService,
        {
          provide: getRepositoryToken(List),
          useClass: Repository,
          useValue: {
            save: jest.fn(),
            findOneBy: jest.fn(),
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

    listService = module.get<ListsService>(ListsService);
    repository = module.get<Repository<List>>(getRepositoryToken(List));
    userService = module.get<UsersService>(UsersService);
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

  const createListDto = {
    name: 'Test List',
    description: 'Test Description',
    id: 1,
  };

  describe('create', () => {
    it('should create list', async () => {
      jest
        .spyOn(userService, 'findOne')
        .mockImplementationOnce(() => Promise.resolve(mockUser));
      jest
        .spyOn(repository, 'save')
        .mockImplementationOnce(() => Promise.resolve(mockList));

      const result = await listService.create(createListDto, mockUser.id);

      expect(userService.findOne).toHaveBeenCalledWith(mockUser.id);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          name: createListDto.name,
          description: createListDto.description,
          user: mockUser,
        }),
      );
      expect(result).toEqual(mockList);
    });

    it('should throw a ConflictException if the user is not found', async () => {
      jest
        .spyOn(userService, 'findOne')
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(
        listService.create(createListDto, mockUser.id),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('findOne', () => {
    it('should return a List with specified id', async () => {
      jest
        .spyOn(repository, 'findOneBy')
        .mockImplementationOnce(() => Promise.resolve(mockList));
      const result = await listService.findOne(mockList.id);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: mockList.id });
      expect(result).toEqual(mockList);
    });
  });

  describe('findAll', () => {
    const secondMockList = {
      id: 2,
      name: 'Second Test List',
      description: 'Test Description',
      user: mockUser,
      tasks: [],
    };

    const newMockList = [mockList, secondMockList];
    it('should return an array of all list for specified user', async () => {
      jest
        .spyOn(repository, 'find')
        .mockImplementationOnce(() => Promise.resolve(newMockList));
      const result = await listService.findAll(mockUser.id);
      expect(repository.find).toHaveBeenCalledWith({
        where: { user: { id: mockUser.id } },
      });
      expect(result).toEqual(newMockList);
    });
  });

  describe('update', () => {
    const updateListDto = {
      name: 'Updated List Name',
      description: 'Updated Description',
    };
    it('should update an existing list', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementationOnce(() => Promise.resolve(mockList));
      jest.spyOn(repository, 'update').mockResolvedValue(undefined);

      const updatedList = { ...mockList, ...updateListDto };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(updatedList);

      const result = await listService.update(
        mockList.id,
        updateListDto,
        mockUser.id,
      );

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: mockList.id },
        relations: ['user'],
      });
      expect(repository.update).toHaveBeenCalledWith(mockList.id, {
        name: updateListDto.name,
        description: updateListDto.description,
      });
      expect(result).toEqual(updatedList);
    });
  });

  describe('remove', () => {
    it('should remove a list', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementationOnce(() => Promise.resolve(mockList));
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 1 } as any);

      await listService.remove(mockList.id, mockUser.id);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: mockList.id },
        relations: ['user'],
      });

      expect(repository.delete).toHaveBeenCalledWith(mockList.id);
    });
    it('should throw NotFoundException if the list does not exist or user does not have permission', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        listService.remove(mockList.id, mockUser.id),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
