import { TaskListItemDTO } from "./TaskListItemDTO";

export class TaskListItem {
  id: number; 
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;

  constructor(
    id: number,
    title: string,
    description: string,
    dueDate: string,
    priority: string,
    status: string = "pendiente"
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
  }

  static fromDTO(dto: TaskListItemDTO): TaskListItem {
    return new TaskListItem(
      dto.id, 
      dto.title,
      dto.description,
      dto.dueDate,
      dto.priority,
      dto.status
    );
  }
}
