import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Root from './components/layout/root';
import MonthlyGantt from './components/pages/MonthlyGantt/MonthlyGantt';
import InventoryWindow from './components/pages/InventoryWindow/InventoryWindow';
import ProcessStatus from './components/pages/ProcessStatus/ProcessStatus';
import Calendar from './components/pages/Calendar/Calendar';
import "./index.css";
import ContextWrapper from './context/ContextWrapper';



const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <MonthlyGantt />,
      },
      {
        path: "/process-status",
        element: <ProcessStatus />,
      },
      {
        path: "/calendar",
        element: <Calendar />,
      }
    ],
  },
  {
    path: "/inventory",
    element: <InventoryWindow />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextWrapper>
      <RouterProvider router={router} />
    </ContextWrapper>
  </React.StrictMode>
)
