import { IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/entities/users/entities/user.entity";

export class CreateListDto {
    id:number;

    @IsNotEmpty({message: "Name cannot be empty"})
    name:string;
    
    @IsOptional()
    description?:string;

}
