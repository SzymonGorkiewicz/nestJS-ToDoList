import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { List } from './entities/list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';


@Module({
  imports: [TypeOrmModule.forFeature([List]),
            UsersModule],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
