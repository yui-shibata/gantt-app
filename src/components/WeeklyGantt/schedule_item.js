var today = new Date('2023/5/29'),
    day = 1000 * 60 * 60 * 24;

  // Set to 00:00:00:000 today
  today.setUTCHours(0);
  today.setUTCMinutes(0);
  today.setUTCSeconds(0);
  today.setUTCMilliseconds(0);
  today = today.getTime();

export const schedule_item = {
  plant: 'L1工場',
  current: 0,
  deals: [{
    product: 'KC8UAW 1330(L3)',
    from: today + 1 * day,
    to: today + 2 * day
  }, {
    product: 'KC4UASW 1490(L3)',
    from: today + 3 * day,
    to: today + 2 * day
  }, {
    product: 'KC6UAW 1330(L3)',
    from: today + 5 * day,
    to: today + 6 * day
  }]
};