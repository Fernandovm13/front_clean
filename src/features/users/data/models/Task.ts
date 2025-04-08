export class Task {
    title: string;
    description: string;
    dueDate: string; 
    priority: string;
    status: string;
  
    constructor(title: string, description: string, dueDate: string, priority: string, status: string = "pendiente") {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.status = status;
    }
  
    toApiFormat() {
      return {
        title: this.title,
        description: this.description,
        due_date: this.dueDate, 
        priority: this.priority,
        status: this.status
      };
    }
  }
  