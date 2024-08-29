import { List } from "src/entities/lists/entities/list.entity";

export class CreateTaskDto {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    list: List;
}
