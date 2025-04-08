import { TaskListRepository } from "../data/repository/TaskListRepository";

export class DeleteTaskUseCase {
  private repository: TaskListRepository;

  constructor() {
    this.repository = new TaskListRepository();
  }

  async execute(id: number): Promise<void> {
    await this.repository.deleteTask(id);
  }
}
