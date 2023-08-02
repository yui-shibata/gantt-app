import moment from 'moment';

export const getCalendar = () => {

  let block_number = 0;
  let days;
  let start_month = moment('2023-7');
  let end_month = moment('2023-7');
  let between_month = end_month.diff(start_month, 'months');
  let calendars = [];
  for (let i = 0; i <= between_month; i++) {
    days = getDays(start_month.year(), start_month.format('MM'), block_number);
    calendars.push({
      date: start_month.format('YYYY年MM月'),
      year: start_month.year(),
      month: start_month.month(), // month(), 0, 1..11 と表示
      start_block_number: block_number,
      calendar: days.length,
      days: days,
    });
    start_month.add(1, 'months');
    block_number = days[days.length - 1].block_number + 1;
  }
  return calendars;
}

const getDays = (year, month, block_number) => {
  const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
  let days = [];
  let date = moment(`${year}-${month}-01`);
  let num = date.daysInMonth();

  for (let i = 0; i < num; i++) {
    let hours = [];
    for (let hour = 0; hour < 24; hour++) {
      hours.push(hour);
    }
    days.push({
      day: date.date(),
      dayOfWeek: dayOfWeek[date.day()],
      block_number,
      hours
    });
    block_number++;
    date.add(1, 'day');
  }
  return days;
}


export const areDatesSame = (first, second) => {
  return (first.getFullYear() === second.getFullYear() && 
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate() &&
  first.getHours() === second.getHours()
  )
}

export const addDateBy = (date, count, hours = 0) => {
  const d = new Date(date);
  d.setDate(d.getDate() + count);
  d.setHours(d.getHours() + hours);
  return d;
}

export const addDateTimeBy = (date, count, hours) => {
  const d = addDateBy(date, count)
  console.log('new Date(d.setHours(d.getHours() + (hours+8)))', new Date(d.setHours(d.getHours() + (hours))))
  return new Date(d.setHours(d.getHours() + (hours)))
}

export const getMonday = () => {
  const today = new Date();
  const first = today.getDate() - today.getDay() + 1;
  const monday = new Date(today.setDate(first));
  monday.setHours(8, 0, 0, 0);

  return monday;
}

export const getRandamDarkColor = () => {
  let color = '#';
  for(let i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 10)
  }
  return color;
}

export const range = (end) => {
  const {result} = Array.from({length:end}).reduce(
    ({result, current}) => ({
      result:[...result, current],
      current:current+1
    }),
    {result:[], current:1}
  );
  return result;
}