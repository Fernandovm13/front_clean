import { TaskDTO } from "../models/TaskDTO";
import { Task } from "../models/Task";

export class TaskRepository {
  async create(task: Task): Promise<TaskDTO | null> {
    const url = `${import.meta.env.VITE_TASK_URL}/tasks`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(task.toApiFormat()), 
    });

    if (!response.ok) {
      console.error("Error al crear tarea:", await response.text());
      return null;
    }

    const data = await response.json();

    return TaskDTO.fromApi(data); 
  }
}
