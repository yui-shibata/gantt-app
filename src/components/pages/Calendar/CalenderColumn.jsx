import React from 'react';

function CalenderColumn({
  day,
  calendarViewHeight
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
        <div 
        style={{ left:'100px',  fontSize: 25, fontWeight: 'bold', cursor: 'move',}}
        className='rounded-lg absolute h-5 bg-yellow-100'>
          aaaaa
        </div>
      </div>
  );
}

export default CalenderColumn;
