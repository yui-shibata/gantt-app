import React, {useEffect, useState} from 'react'
import WeeklyGantt from '../WeeklyGantt';
import { schedule_item } from './data/schedule_item';


function splitScheduleByWeek(schedule) {
  const result = [];
  let currentWeekStart = new Date(schedule[0].start);
  let currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekEnd.getDate() + 7);

  let idCounter = 1; // 一意のID用カウンタ

  while (currentWeekStart <= new Date(schedule[schedule.length - 1].end)) {
    const currentWeekSchedule = schedule.filter(item => {
      const itemStart = new Date(item.start);
      const itemEnd = new Date(item.end);
      return (
        (itemStart >= currentWeekStart && itemStart <= currentWeekEnd) ||
        (itemEnd >= currentWeekStart && itemEnd <= currentWeekEnd) ||
        (itemStart <= currentWeekStart && itemEnd >= currentWeekEnd)
      );
    });

    const updatedWeekSchedule = currentWeekSchedule.map(item => {
      const start = new Date(item.start);
      const end = new Date(item.end);

      // 1週間の範囲内に収まるようにstartとendを調整
      const adjustedStart = Math.max(start, currentWeekStart);
      const adjustedEnd = Math.min(end, currentWeekEnd);

      return {
        ...item,
        start: adjustedStart,
        end: adjustedEnd,
        id: `deal-${idCounter++}`,
        y: 0
      };
    });

    result.push(updatedWeekSchedule);
    currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    currentWeekEnd.setDate(currentWeekEnd.getDate() + 7);
  }

  return result;
}

const MonthlyGantt = () => {
  const [scheduleByWeek, setScheduleByWeek] = useState([]);
  useEffect (() => {
    const resSplitScheduleByWeek = splitScheduleByWeek(schedule_item)
    console.log(resSplitScheduleByWeek)
    setScheduleByWeek(resSplitScheduleByWeek)
  }, [])

  return (
    <div className='monthly-gantt-container'>
    {scheduleByWeek.map((element, index) => (
        <WeeklyGantt plan={element} key={index} />
    ))}
    </div>
  )
}

export default MonthlyGantt;
