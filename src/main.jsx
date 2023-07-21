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
import "./index.css";
import ContextWrapper from './context/ContextWrapper';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import MonthlyCalender from './components/pages/Calendar/MonthlyCalender';



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
        element: <MonthlyCalender />,
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
    <DndProvider backend={HTML5Backend}>
      <ContextWrapper>
        <RouterProvider router={router} />
      </ContextWrapper>
    </DndProvider>
  </React.StrictMode>
)
