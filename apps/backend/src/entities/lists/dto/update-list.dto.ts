import { PartialType } from '@nestjs/mapped-types';
import { CreateListDto } from './create-list.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateListDto extends PartialType(CreateListDto) {
  @IsOptional()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name?: string;

  @IsOptional()
  description?: string;
}
