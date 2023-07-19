import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import GlobalContext from "../../../context/Globalcontext";
import Time from "./Time";

export const Day = (props) => {
  const { day, rowIdx } = props;
  const {date, hours} = day
  const [dayEvents, setDayEvents] = useState([]);
  const { setDaySelected, setShowEventModal, savedEvents, setSelectedEvent } = useContext(GlobalContext);

  // const hours = [];
  // for (let i = 0; i < 24; i += 6) {
  //   hours.push(dayjs(day).hour(i));
  // }

  // 登録データを日付が一致する日に表示
  useEffect(() => {
    const events = savedEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === date.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [savedEvents, day]);

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {/* 1行目に曜日を表示 */}
        {rowIdx === 0 && <p className="text-sm mt-1">{date.format("ddd")}</p>}
        <div className={`text-sm text-center`}>
          {date.format("DD")}
        </div>
      </header>
      <Time hours={hours} dayEvents={dayEvents}/>
    </div>
  );
};