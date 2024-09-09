import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(param: string | number): Promise<User> {
    if (typeof param === 'number') {
      return await this.userRepository.findOneBy({ id: param });
    } else if (typeof param === 'string') {
      return await this.userRepository.findOneBy({ username: param });
    }
    throw new Error(
      'Invalid parameter type. Must be a string (username) or number (id).',
    );
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.update({ id }, updateUserDto);
    return user;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
