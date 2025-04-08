import { TaskDTO } from "../data/models/TaskDTO";
import { Task } from "../data/models/Task";
import { TaskRepository } from "../data/repository/TaskRepository";

export class CreateTaskUseCase {
  taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async execute(task: Task): Promise<TaskDTO | null> {
    return await this.taskRepository.create(task);
  }
}
