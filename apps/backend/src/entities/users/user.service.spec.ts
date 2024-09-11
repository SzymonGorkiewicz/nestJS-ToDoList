import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe',
    password: 'password123',
  };

  const mockUsers: User[] = [mockUser as User];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValue(mockUsers);

      const result = await service.findAll();

      expect(userRepository.find).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should find a user by id', async () => {
      jest
        .spyOn(userRepository, 'findOneBy')
        .mockResolvedValue(mockUser as User);

      const result = await service.findOne(1);

      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(mockUser);
    });

    it('should find a user by username', async () => {
      jest
        .spyOn(userRepository, 'findOneBy')
        .mockResolvedValue(mockUser as User);

      const result = await service.findOne('johndoe');

      expect(userRepository.findOneBy).toHaveBeenCalledWith({
        username: 'johndoe',
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if parameter type is invalid', async () => {
      await expect(service.findOne({} as any)).rejects.toThrow(
        'Invalid parameter type. Must be a string (username) or number (id).',
      );
    });
  });
});
