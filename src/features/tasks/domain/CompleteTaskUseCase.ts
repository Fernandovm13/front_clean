import { TaskListRepository } from '../data/repository/TaskListRepository';

export class CompleteTaskUseCase {
  private repository: TaskListRepository;

  constructor() {
    this.repository = new TaskListRepository();
  }

  async execute(id: number): Promise<void> {
    await this.repository.completeTask(id);
  }
}
