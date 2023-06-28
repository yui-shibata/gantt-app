import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Routes, Route
} from "react-router-dom";
import Root from "./routes/root.jsx";
import ErrorPage from "./error-page";
import Gantt from './components/Gantt';
import WeeklyGantt from './components/WeeklyGantt';
import plan from './resources/plan.json'
import MonthlyGantt from './components/MonthlyGantt/MonthlyGantt';



const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Gantt />,
      },
      {
        path: "/monthly_gantt",
        element: <MonthlyGantt />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
