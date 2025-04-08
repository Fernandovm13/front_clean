import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { TaskFormViewModel } from "../viewmodels/TaskFormViewModel";
import { CalendarDays } from "lucide-react";

type Props = {
  viewModel: TaskFormViewModel;
};

export const TaskForm = observer(({ viewModel }: Props) => {
  useEffect(() => {
    if (viewModel.isCreated) {
      console.log("Tarea creada exitosamente");
    }
  }, [viewModel.isCreated]);

  return (
    <div className="bg-[#0D0D0D] border border-zinc-700 rounded-2xl overflow-hidden shadow-md w-full max-w-xl">
      {/* Encabezado */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 px-6 py-4">
        <h2 className="text-white text-xl font-semibold flex items-center gap-2">
          <CalendarDays size={20} />
          Nueva Tarea
        </h2>
      </div>

      {/* Formulario */}
      <div className="p-6 space-y-4">
        {viewModel.error && (
          <p className="text-red-400 text-sm text-center">{viewModel.error}</p>
        )}
        <div>
          <label className="block text-white text-sm font-medium mb-1">
            Título de la tarea
          </label>
          <input
            type="text"
            value={viewModel.title}
            onChange={(e) => viewModel.onChangeTitle(e.target.value)}
            placeholder="Ingresa el título de la tarea"
            className="w-full p-2 rounded-md bg-zinc-900 text-white placeholder-zinc-500 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-white text-sm font-medium mb-1">
            Descripción
          </label>
          <textarea
            value={viewModel.description}
            onChange={(e) => viewModel.onChangeDescription(e.target.value)}
            placeholder="Describe brevemente la tarea"
            className="w-full p-2 rounded-md bg-zinc-900 text-white placeholder-zinc-500 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-white text-sm font-medium mb-1">
              Fecha límite
            </label>
            <div className="flex items-center gap-2 bg-zinc-900 rounded-md border border-zinc-700 px-2">
              <CalendarDays size={18} className="text-zinc-400" />
              <input
                type="date"
                value={viewModel.dueDate}
                onChange={(e) => viewModel.onChangeDueDate(e.target.value)}
                className="w-full p-2 bg-transparent text-white focus:outline-none"
              />
            </div>
          </div>
          <div className="w-1/2">
            <label className="block text-white text-sm font-medium mb-1">
              Prioridad
            </label>
            <select
              value={viewModel.priority}
              onChange={(e) => viewModel.onChangePriority(e.target.value)}
              className="w-full p-2 rounded-md bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona la prioridad</option>
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>
          </div>
        </div>
        <button
          type="button"
          className="w-full mt-2 bg-white text-black font-semibold py-2 rounded-md hover:bg-zinc-100 transition-colors"
          onClick={() => viewModel.createTask()}
        >
          Agendar Tarea
        </button>
      </div>
    </div>
  );
});

export default TaskForm;