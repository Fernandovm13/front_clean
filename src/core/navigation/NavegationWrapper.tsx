import { createBrowserRouter } from "react-router";
import { TaskManagerPage } from "../../features/tasks/presentation/pages/TaskManagerPage";
import Dashboard from "../../features/dashboard/presentation/pages/Dashboard";

export const navigationWrapper = createBrowserRouter([
  {
    path: "/",
    element: <TaskManagerPage />, 
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  }
]);
