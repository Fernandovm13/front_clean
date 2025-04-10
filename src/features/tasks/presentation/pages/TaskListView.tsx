import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { TaskListViewModel } from "../viewmodels/TaskListViewModel";
import { ClipboardList, Search } from "lucide-react";


type Props = {
  viewModel: TaskListViewModel;
};

export const TaskListView = observer(({ viewModel }: Props) => {
  useEffect(() => {
    viewModel.fetchTaskList();
  }, [viewModel]);

  return (
    <div className="bg-[#0D0D0D] border border-zinc-700 rounded-2xl overflow-hidden shadow-md w-full max-w-xl">
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 px-6 py-4">
        <h2 className="text-white text-xl font-semibold flex items-center gap-2">
          <ClipboardList size={20} className="text-white" />
          Mis Tareas
        </h2>
      </div>

      <div className="p-6 space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar tareas..."
            className="w-full pl-10 p-2 rounded-md bg-zinc-900 text-white placeholder-zinc-500 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={viewModel.searchTerm}
            onChange={(e) => viewModel.onChangeSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex rounded-md overflow-hidden border border-zinc-700">
          <button
            className={`flex-1 px-3 py-2 text-sm font-medium ${viewModel.filterStatus === 'todas' ? 'bg-blue-600 text-white' : 'bg-zinc-900 text-zinc-300'}`}
            onClick={() => viewModel.onChangeFilterStatus('todas')}
          >
            Todas
          </button>
          <button
            className={`flex-1 px-3 py-2 text-sm font-medium ${viewModel.filterStatus === 'pendientes' ? 'bg-blue-600 text-white' : 'bg-zinc-900 text-zinc-300'}`}
            onClick={() => viewModel.onChangeFilterStatus('pendientes')}
          >
            Pendientes
          </button>
          <button
            className={`flex-1 px-3 py-2 text-sm font-medium ${viewModel.filterStatus === 'completadas' ? 'bg-blue-600 text-white' : 'bg-zinc-900 text-zinc-300'}`}
            onClick={() => viewModel.onChangeFilterStatus('completadas')}
          >
            Completadas
          </button>
        </div>

        {viewModel.error && (
          <p className="text-red-400 text-sm text-center">{viewModel.error}</p>
        )}

        <div className="mt-4">
          {viewModel.filteredTaskList.length === 0 ? (
            <p className="text-zinc-400 text-center py-4">
              {viewModel.filterStatus === 'completadas' 
                ? 'No hay tareas completadas' 
                : 'No hay tareas por mostrar'}
            </p>
          ) : (
            viewModel.filteredTaskList.map((task) => (
              <div 
                key={task.id} 
                className="bg-zinc-900 p-4 mb-3 rounded-lg border border-zinc-700 hover:border-zinc-600 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                  <span 
                    className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === 'alta' ? 'bg-red-900 text-red-200' :
                      task.priority === 'media' ? 'bg-yellow-900 text-yellow-200' :
                      'bg-green-900 text-green-200'
                    }`}
                  >
                    {task.priority.toUpperCase()}
                  </span>
                </div>

                {task.description && (
                  <p className="text-sm mt-2 text-zinc-300">{task.description}</p>
                )}

                <span>
                  Fecha límite:{" "}
                  {task.dueDate && task.dueDate.trim() !== ""
                    ? new Date(task.dueDate).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })
                    : "sin fecha límite"}
                </span>

                <div className="mt-2 flex justify-between items-center">
                  <span 
                    className={`text-xs px-2 py-1 rounded ${
                      task.status === 'completada' ? 'bg-green-900 text-green-200' : 'bg-blue-900 text-blue-200'
                    }`}
                  >
                    {task.status.toUpperCase()}
                  </span>

                  <div className="flex gap-2">
                    {task.status !== 'completada' && (
                      <button
                        onClick={() => viewModel.completeTask(task.id)}
                        className="text-xs bg-green-700 hover:bg-green-600 text-white px-2 py-1 rounded"
                      >
                        Marcar como completada
                      </button>
                    )}
                    <button
                      onClick={() => viewModel.deleteTask(task.id)}
                      className="text-xs bg-red-700 hover:bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
});

export default TaskListView;
