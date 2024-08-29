import { ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  async create(createListDto: CreateListDto, userID:number) : Promise<List> {
  
    const user = await this.userService.findOne(userID)

    if (!user){
      throw new ConflictException("User not found exception")
    }

    const list = new List();
    list.name = createListDto.name;
    list.description = createListDto.description;
    list.user = user
    

    return await this.listRepository.save(list);

  }

  findOne(id:number){
    return this.listRepository.findOneBy({id:id})
  }

  findAll(userID: number) {
    return this.listRepository.find({where: {user: {id:userID}}});
  }

  async update(id: number, updateListDto: UpdateListDto, userID:number): Promise<List> {
    const list = await this.listRepository.findOne({where: {id:id}, relations: ['user']})
    
    const updatedFields: Partial<List> = {};

    if(!list || list.user.id !== userID){
      throw new NotFoundException("No permission")
    }

    if (updateListDto.description){
      updatedFields.description = updateListDto.description
    }

    if (updateListDto.name){
      updatedFields.name = updateListDto.name
    }
    
    await this.listRepository.update(id,updatedFields)

    return this.listRepository.findOneBy({id:id});
  }

  async remove(id: number, userID:number) {
    const list = await this.listRepository.findOne({where: {id:id}, relations:['user']})

    if (!list || list.user.id !==userID){
      throw new NotFoundException("No permission")
    }

    return await this.listRepository.delete(id);
  }
}
