import React from "react";
import { TaskFormViewModel } from "../../../users/presentation/viewmodels/TaskFormViewModel";
import { TaskForm } from "../../../users/presentation/pages/TaskForm";
import { TaskListViewModel } from "../viewmodels/TaskListViewModel";
import { TaskListView } from "../pages/TaskListView";

const taskListViewModel = new TaskListViewModel();
const taskFormViewModel = new TaskFormViewModel();

export const TaskManagerPage: React.FC = () => {
  
  const handleTaskCreated = async () => {
    await taskListViewModel.fetchTaskList();
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Gestor de Tareas</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <TaskForm viewModel={taskFormViewModel} onTaskCreated={handleTaskCreated} />
        <TaskListView viewModel={taskListViewModel} />
      </div>
    </div>
  );
};
