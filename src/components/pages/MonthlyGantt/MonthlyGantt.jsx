import { useEffect, useState, useReducer} from 'react';
import WeeklyGantt from './WeeklyGantt';
import {Button} from '@mui/material'
import { initialState, tasksReducer} from '../../../stores/tasksReducer'
import { useImmerReducer } from 'use-immer';



const MonthlyGantt = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, initialState)

  useEffect(() => {
    console.log(tasks)
  }, [tasks])

  return (
    <div className="monthly-gantt-container">
      <Button component="a" href="/inventory" target="_blank" rel="noopener">
        在庫表示
      </Button>
      {tasks.map((element, index) => (
        <WeeklyGantt
          tasks={tasks}
          plan={element.data}
          initialMin={element.schedule_start}
          initialMax={element.schedule_end}
          key={index}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
};

export default MonthlyGantt;
