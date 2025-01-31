import MonthlyCalender from "./MonthlyCalender";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDrop } from 'react-dnd'
import { MOCKEVENTS } from "./conts";
import { useState } from "react";


export default function MonthlyCalender() {
  const { categories, tasks } = MOCKEVENTS;

  const addEvent = (date, color, e) => {
    const text = window.prompt('text');
    const from = window.prompt('from');
    const to = window.prompt('to');

    date.setHours(from);

    setEvents((prev) => [...prev, { text, date, color, howlong: (to - from)*60, id:Math.random() }]);
  };

  const onDragEvents = (updatedEvents) => {
    setEvents(updatedEvents)
  }
  return (
    <>
      <WeeklyCalender categories={categories} tasks={tasks} />
    </>
  )
}
