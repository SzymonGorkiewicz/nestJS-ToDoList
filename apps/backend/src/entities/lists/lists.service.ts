import { ConflictException, Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class ListsService {

  constructor(@InjectRepository(List) private listRepository: Repository<List>, 
    private userService: UsersService
    ){}

  async create(createListDto: CreateListDto) : Promise<List> {
    
    const user = await this.userService.findOne(createListDto.user)

    if (!user){
      throw new ConflictException("Blad")
    }

    const list = new List();
    list.name = createListDto.name;
    list.description = createListDto.description;
    list.user = user
    

    return await this.listRepository.save(list);

  }

  findAll() {
    return `This action returns all lists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} list`;
  }

  update(id: number, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}
