import React from 'react'

export default function Time({hours, dayEvents}) {
  return (
    <>
    <div className="text-sm flex flex-row" >
      {hours.map(({hour}, idx) => (
        <div key={idx} className="border basis-1/4">{hour.format("HH")}</div>
      ))}
    </div>
    <div
      className="flex-1 cursor-pointer"
      onClick={() => {
        setDaySelected(day);
        setShowEventModal(true);
      }}
    >
      {hours.map((hour) => {
        <div></div>
      })}
      {dayEvents.map((evt, idx) => (
        <div
          key={idx}
          onClick={() => setSelectedEvent(evt)}
          className={`bg-neutral-200 p-1 mt-3 text-gray-600 text-sm rounded mb-1 truncate`}
        >
          {evt.title}
        </div>
      ))}
    </div>
    </>
)
}
