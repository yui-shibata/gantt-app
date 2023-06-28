import React from 'react'
import WeeklyGantt from '../WeeklyGantt';
import { schedule_item } from '../WeeklyGantt/schedule_item';

const MonthlyGantt = () => {
  return (
    <>
    <WeeklyGantt plan={schedule_item} />
    <WeeklyGantt plan={schedule_item} />
    <WeeklyGantt plan={schedule_item} />
    <WeeklyGantt plan={schedule_item} />
    <WeeklyGantt plan={schedule_item} />
    </>
  )
}

export default MonthlyGantt;
