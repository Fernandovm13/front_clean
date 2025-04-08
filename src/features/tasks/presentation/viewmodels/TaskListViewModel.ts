import { makeAutoObservable, runInAction } from "mobx";
import { TaskListItem } from "../../data/models/TaskListItem";
import { GetTaskListUseCase } from "../../domain/GetTaskListUseCase";
import { DeleteTaskUseCase } from "../../domain/DeleteTaskUseCase";
import { CompleteTaskUseCase } from "../../domain/CompleteTaskUseCase";
import toast from "react-hot-toast";


export class TaskListViewModel {
  taskList: TaskListItem[] = [];
  searchTerm: string = "";
  filterStatus: string = "todas";
  error: string | null = null;

  private getTaskListUseCase: GetTaskListUseCase;
  private deleteTaskUseCase: DeleteTaskUseCase;
  private completeTaskUseCase: CompleteTaskUseCase;

  constructor() {
    makeAutoObservable(this);
    this.getTaskListUseCase = new GetTaskListUseCase();
    this.deleteTaskUseCase = new DeleteTaskUseCase();
    this.completeTaskUseCase = new CompleteTaskUseCase();
  }

  async fetchTaskList() {
    try {
      const result = await this.getTaskListUseCase.execute();
      runInAction(() => {
        this.taskList = result.map(dto => TaskListItem.fromDTO(dto));
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message || "Error al cargar las tareas";
      });
    }
  }

  async deleteTask(id: number) {
    try {
      await this.deleteTaskUseCase.execute(id);
      runInAction(() => {
        this.taskList = this.taskList.filter(task => task.id !== id);
      });
      toast.success("Tarea eliminada correctamente");
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message || "Error al eliminar la tarea";
      });
      toast.error(this.error);
    }
  }
  

  async completeTask(id: number) {
    try {
      await this.completeTaskUseCase.execute(id);
      await this.fetchTaskList();
      toast.success("Tarea marcada como completada");
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message || "Error al completar la tarea";
      });
      toast.error("Hubo un error al marcar como completada");
    }
  }
  
 

  onChangeSearchTerm(value: string) {
    this.searchTerm = value;
  }

  onChangeFilterStatus(value: string) {
    this.filterStatus = value;
  }

  get filteredTaskList(): TaskListItem[] {
    let filtered = this.taskList.filter((task) =>
      task.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    if (this.filterStatus === "pendientes") {
      filtered = filtered.filter((task) => task.status === "pendiente");
    } else if (this.filterStatus === "completadas") {
      filtered = filtered.filter((task) => task.status === "completada");
    }

    return filtered;
  }
}
