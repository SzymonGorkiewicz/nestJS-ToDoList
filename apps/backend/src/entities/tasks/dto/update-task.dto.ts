import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsString()
    @IsNotEmpty({ message: 'Title cannot be empty' })
    title?:string

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty({ message: 'List ID cannot be empty' })
    list?: number;

    @IsOptional()
    @IsBoolean({ message: 'Completed must be a boolean value' })
    completed?: boolean;

}
