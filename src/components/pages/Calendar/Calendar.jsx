import { useState, useEffect, useContext } from "react";
import { getMonth } from "../../../util/util";
import { CalendarHeader } from "./CalendarHeader";
import { Month } from "./Month";
import GlobalContext from "../../../context/Globalcontext";
import { EventModal } from "./EventModal";

import React from 'react'

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);
  
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  console.table(getMonth(8));
  return (
    <>
      {showEventModal && <EventModal />}
      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Month month={currentMonth} />
        </div>
      </div>
    </>
  )
}