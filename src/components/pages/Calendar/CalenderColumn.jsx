import React from 'react';
import Task from './Task';

function CalenderColumn({
  day,
  calendarViewHeight,
  displayTask
}) {
  return (
    <div
      className='border-r border-b absolute'
      style={{
        width: `${100}px`,
        left: `${day.block_number * 100}px`,
        height: `${calendarViewHeight}px`,
        background:
          day.dayOfWeek === '土'
            ? '#DBEAE7'
            : day.dayOfWeek === '日'
            ? '#FEE2E2'
            : 'transparent',
      }}>
        {
          displayTask && (
          <Task bar={displayTask} />
          )
        }
      </div>
  );
}

export default CalenderColumn;
