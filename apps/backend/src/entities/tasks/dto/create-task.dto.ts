import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  id: number;

  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty({ message: 'List ID cannot be empty' })
  @IsNumber()
  list: number;
}
