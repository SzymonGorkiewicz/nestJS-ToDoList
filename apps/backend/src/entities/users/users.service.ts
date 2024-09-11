import { Injectable } from '@nestjs/common';
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
}
