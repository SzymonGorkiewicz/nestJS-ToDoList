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
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post('create')
  @UsePipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false }),
  )
  create(@Req() request, @Body() createListDto: CreateListDto) {
    const userID = request.decodedData.sub;
    return this.listsService.create(createListDto, userID);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.listsService.findAll(+id);
  }

  @Get('get/:id')
  findOne(@Param('id') taskID: string) {
    console.log('wchodzi');
    return this.listsService.findOne(+taskID);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(
    @Req() request,
    @Param('id') id: string,
    @Body() updateListDto: UpdateListDto,
  ) {
    const userID = request.decodedData.sub;
    return this.listsService.update(+id, updateListDto, userID);
  }

  @Delete(':id')
  remove(@Req() request, @Param('id') id: string) {
    const userID = request.decodedData.sub;
    return this.listsService.remove(+id, userID);
  }
}
