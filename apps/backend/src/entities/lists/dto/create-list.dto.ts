import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateListDto {
  id: number;

  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsOptional()
  description?: string;
}
