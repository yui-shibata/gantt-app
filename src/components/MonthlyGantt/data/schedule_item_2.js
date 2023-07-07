const getTime = (time) => {
  let date = new Date(time);
  return date.getTime();
}

const calculateDuration = (start, end) => {
  const startTimestamp = getTime(start);
  const endTimestamp = getTime(end);
  const duration = endTimestamp - startTimestamp;

  // durationを適切な形式にフォーマットする（例: 時間と分）
  const days = Math.floor(duration / (24 * 60 * 60 * 1000));
  const hours = Math.floor((duration % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  return `${days}日${hours}時間`;
}


export const schedule_item_2 = [
  {
    id:'deal-3',
    start:getTime('2023/10/5  13:20:00'),
    end:getTime('2023/10/6  14:20:00'),
    duration:calculateDuration('2023/10/5  13:20:00','2023/10/6  14:20:00'),
    name:'切り替え',
    y: 1
  }
]
;