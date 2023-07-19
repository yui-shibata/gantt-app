import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      const date =  dayjs(new Date(year, month, currentMonthCount));
      const hours = new Array(4).fill(null).map((_, hourIndex) => {
        const hour = dayjs(new Date(year, month, currentMonthCount, hourIndex * 6));
        return {
          hour,
        };
      });
      currentMonthCount++;
      return {
        date,
        hours,
      };
    });
  });
  return daysMatrix;
}