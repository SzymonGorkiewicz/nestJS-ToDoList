import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../entities/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/entities/users/dto/create-user.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  let userRepository: Repository<User>;
  const mockUser = {
    id: 1,
    username: 'Test',
    password: 'Test123!',
    name: 'Szymon',
    email: 'test@gmail.com',
  };

  const createUserDto: CreateUserDto = {
    username: 'TestUser',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password',
  };

  const mockAccessToken = 'mock-jwt-token';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
            provide: getRepositoryToken(User),
            useValue: {
              findOne: jest.fn(),
              save: jest.fn(),
              findOneBy: jest.fn(),
            },
          },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('signIn', () => {
    it('should return an access token and user details if credentials are valid', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue(mockUser as User);
      (bcrypt.compare as jest.Mock) = jest.fn().mockResolvedValue(true);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(mockAccessToken);

      const result = await authService.singIn(mockUser.username, mockUser.password);

      expect(usersService.findOne).toHaveBeenCalledWith(mockUser.username);
      expect(bcrypt.compare).toHaveBeenCalledWith("Test123!", mockUser.password);
      expect(jwtService.signAsync).toHaveBeenCalledWith({ sub: mockUser.id, username: mockUser.username });
      expect(result).toEqual({
        access_token: mockAccessToken,
        username: mockUser.username,
        name: mockUser.name,
        id: mockUser.id,
        email: mockUser.email,
      });
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue(null);

      await expect(authService.singIn('invaliduser', 'wrongpassword')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if password does not match', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue(mockUser as User);
      (bcrypt.compare as jest.Mock) = jest.fn().mockResolvedValue(false);

      await expect(authService.singIn(mockUser.username, 'wrongpassword')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('register', () => {
    it('should throw ConflictException if user already exists', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue(mockUser as User);

      await expect(authService.register(createUserDto)).rejects.toThrow(ConflictException);
    });

    it('should hash the password and save a new user if user does not exist', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue(null);
      (bcrypt.hash as jest.Mock) = jest.fn().mockResolvedValue('Test123!');
      jest.spyOn(userRepository, 'save').mockResolvedValue(mockUser as User);

      const result = await authService.register(createUserDto);

      expect(usersService.findOne).toHaveBeenCalledWith(createUserDto.username);
      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
      expect(userRepository.save).toHaveBeenCalledWith(expect.objectContaining({
        username: createUserDto.username,
        name: createUserDto.name,
        email: createUserDto.email,
        password: 'Test123!',
      }));
      expect(result).toEqual(mockUser);
    });
  });
});
