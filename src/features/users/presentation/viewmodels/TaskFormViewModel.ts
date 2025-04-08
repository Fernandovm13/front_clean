import { makeAutoObservable, runInAction } from "mobx";
import { Task } from "../../data/models/Task";
import { CreateTaskUseCase } from "../../domain/CreateTaskUseCase";
import toast from "react-hot-toast";


export class TaskFormViewModel {
  title: string = '';
  description: string = '';
  dueDate: string = '';
  priority: string = '';
  error: string | null = null;
  isCreated = false;

  createTaskUseCase: CreateTaskUseCase;

  constructor() {
    makeAutoObservable(this);
    this.createTaskUseCase = new CreateTaskUseCase();
  }

  onChangeTitle(value: string) {
    this.title = value;
  }

  onChangeDescription(value: string) {
    this.description = value;
  }

  onChangeDueDate(value: string) {
    this.dueDate = value;
  }

  onChangePriority(value: string) {
    this.priority = value;
  }

  async createTask() {
    this.error = null;
    if (!this.title || !this.description || !this.dueDate || !this.priority) {
      this.error = "Todos los campos son obligatorios";
      toast.error(this.error);
      return;
    }
  
    const task = new Task(this.title, this.description, this.dueDate, this.priority);
    try {
      const data = await this.createTaskUseCase.execute(task);
      runInAction(() => {
        if (data) {
          this.isCreated = true;
          this.title = "";
          this.description = "";
          this.dueDate = "";
          this.priority = "";
          toast.success("Tarea creada exitosamente");
        }
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message || "Error al crear la tarea";
        toast.error(this.error);
      });
    }
  }
  
}