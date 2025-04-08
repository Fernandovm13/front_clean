export class TaskDTO {
    id: number;
    title: string;
    description: string;
    dueDate: string; 
    priority: string;
    status: string;
  
    constructor(id: number, title: string, description: string, dueDate: string, priority: string, status: string) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.status = status;
    }
  
    static fromApi(data: any): TaskDTO {
      return new TaskDTO(
        data.id,
        data.title,
        data.description,
        data.due_date, 
        data.priority,
        data.status
      );
    }
  }
  