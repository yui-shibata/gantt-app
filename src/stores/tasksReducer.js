import { schedule_item } from "./data/schedule_item"

export const initialState = splitScheduleByWeek();

export function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'changed': {
      const { newPoint, target, target: { options } } = action.message;
      return tasks.map((task) => {
        if (task.schedule_start <= newPoint.start && task.schedule_end >= newPoint.end) {
          const updatedData = task.data.map((item) => {
            if (item.index === target.index && item.main_index === options.main_index) {
              return {
                ...item,
                start: newPoint.start || item.start,
                end: newPoint.end || item.end
              };
            }
            return item;
          });
          return {
            ...task,
            data: updatedData
          };
        }
        return task;
      });
    }
    default: {
      throw new Error('Unknown action: ' + action.type);
    }
  }
}

function splitRangeByWeek() {
  const searchStartDate = new Date('2023', 8, 29, 8, 0, 0, 0);
  const searchEndDate = new Date('2023', 10, 1, 8, 0, 0, 0);
  const dateRangeArray = [];

  while (searchStartDate <= searchEndDate) {
    dateRangeArray.push({
      start: new Date(searchStartDate),
      end: new Date(searchStartDate.setDate(searchStartDate.getDate() + 7)),
    });

    searchStartDate.setDate(searchStartDate.getDate());
  }
  return dateRangeArray;
}

function splitScheduleByWeek() {
  const result = [];
  let counter = 0;
  splitRangeByWeek().forEach((weekRange, key) => {
    const currentWeekSchedule = schedule_item.filter((item) => {
      const itemStart = new Date(item.start);
      const itemEnd = new Date(item.end);
      return (
        (itemStart >= weekRange.start && itemStart <= weekRange.end) ||
        (itemEnd >= weekRange.start && itemEnd <= weekRange.end) ||
        (itemStart <= weekRange.start && itemEnd >= weekRange.end)
      );
    });
    const updatedWeekSchedule = currentWeekSchedule.flatMap((item, index) => {
      const start = new Date(item.start);
      const end = new Date(item.end);
      const weeklyStart = Math.max(start, weekRange.start);
      const weeklyEnd = Math.min(end, weekRange.end);
      const dailySchedules = [];

      if (item.name.includes("保全") || item.name.includes("切り替え")) {
        dailySchedules.push({
          ...item,
          start: weeklyStart,
          end: weeklyEnd,
          // id: `deal-${counter++}`,
          // main_id: item.id,
          index: counter++,
          y: 0,
          main_index: key,
        });
      } else {
        let currentDate = new Date(weeklyStart);
        const weeklyEndDate = new Date(weeklyEnd);

        while (currentDate < weeklyEndDate) {
          const currentDayEnd = new Date(currentDate);
          currentDayEnd.setDate(currentDate.getDate() + 1);
          currentDayEnd.setHours(8, 0, 0, 0);
          const adjustedEnd = currentDayEnd.getTime() <= end.getTime() ? currentDayEnd.getTime() : end.getTime();

          const data = {
            ...item,
            start: currentDate.getTime(),
            end: adjustedEnd,
            // main_id: item.id,
            // id: `deal-${counter++}`,
            index: counter++,
            y: 0,
            main_index: key,
          };

          dailySchedules.push(data);
          currentDate = new Date(data.end);
        }
      }

      return dailySchedules;
    });

    result.push({
      schedule_start: weekRange.start,
      schedule_end: weekRange.end,
      data: updatedWeekSchedule,
    });
  });
  console.log(result);
  return result;
}
