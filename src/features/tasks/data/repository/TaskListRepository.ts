import { TaskListItemDTO } from "../models/TaskListItemDTO";

export class TaskListRepository {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_TASK_URL || import.meta.env.VITE_URL;
  }

  async getTaskList(): Promise<TaskListItemDTO[]> {
    try {
      const response = await fetch(`${this.baseUrl}/tasks`);
      if (!response.ok) {
        console.error("Error al obtener tareas:", response.statusText);
        return [];
      }

      const data: any[] = await response.json();
      return data.map((item) => TaskListItemDTO.fromApi(item));
    } catch (error) {
      console.error("Error al obtener tareas:", error);
      return [];
    }
  }

  async deleteTask(id: number): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Error al eliminar la tarea:", response.statusText);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      return false;
    }
  }

  async markTaskAsCompleted(id: number): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/tasks/${id}/complete`, {
        method: "PUT",
      });

      if (!response.ok) {
        console.error("Error al marcar como completada:", response.statusText);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error al marcar como completada:", error);
      return false;
    }
  }

  async completeTask(id: number): Promise<boolean> {
    return this.markTaskAsCompleted(id); 
  }
}
