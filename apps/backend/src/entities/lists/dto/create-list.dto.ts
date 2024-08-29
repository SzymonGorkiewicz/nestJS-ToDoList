import { User } from "src/entities/users/entities/user.entity";

export class CreateListDto {
    id:number;
    name:string;
    description:string;
    user: string;
}
