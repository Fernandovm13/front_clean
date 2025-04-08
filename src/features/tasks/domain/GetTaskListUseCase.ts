import { TaskListRepository } from "../data/repository/TaskListRepository";
import { TaskListItemDTO } from "../data/models/TaskListItemDTO";

export class GetTaskListUseCase {
  private taskListRepository: TaskListRepository;

  constructor() {
    this.taskListRepository = new TaskListRepository();
  }

  async execute(): Promise<TaskListItemDTO[]> {
    return await this.taskListRepository.getTaskList();
  }
}