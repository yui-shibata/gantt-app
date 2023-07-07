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



export const schedule_item = [
  {
    id:'deal-1',
    start:getTime('2023/9/29  8:00:00'),
    end:getTime('2023/10/5  13:20:00'),
    production_volume:calculateDuration('2023/9/29  8:00:00','2023/10/5  13:20:00'),
    name:'保全2',
    y: 1,
    color:'#ff6600'
  },
  {
    id:'deal-2',
    start:getTime('2023/10/5  13:20:00'),
    end:getTime('2023/10/6  14:20:00'),
    production_volume:calculateDuration('2023/10/5  13:20:00','2023/10/6  14:20:00'),
    name:'切り替え',
    y: 1,
    color:'#ffcc33'
  },
  {
    id:'deal-3',
    start:getTime('2023/10/6  14:20:00'),
    end:getTime('2023/10/14  21:20:00'),
    name:'KC8UAW 1330(L3)',
    production_volume:'100本',
    y: 1,
    color:'#33cc00'
  },
  {
    id:'deal-4',
    start:getTime('2023/10/14  21:20:00'),
    end:getTime('2023/10/15  5:20:00'),
    name:'切り替え',
    production_volume:calculateDuration('2023/10/5  13:20:00','2023/10/6  14:20:00'),
    y: 1,
    color:'#008899'
  },
  {
    id:'deal-5',
    start:getTime('2023/10/15  5:20:00'),
    end:getTime('2023/10/31  8:00:00'),
    name:'KC4UAW 1330(L3)',
    production_volume:calculateDuration('2023/10/15  5:20:00','2023/10/31  8:00:00'),
    y: 1,
    color:'#00ccff'
  }
]
;