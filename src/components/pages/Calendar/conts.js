export const DAYS = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

export const MOCKEVENTS = {
  //略
  categories: [
      {
      id: 1,
      name: 'L1工場',
      week:'第1週',
      version:'ver.1'
      }, {
      id: 2,
      name: 'L2工場',
      week:'第1週',
      version:'ver.2'
      }
  ],
  tasks: [
      {
      id: 1,
      category_id: 1,
      name: 'テスト1',
      start_date: '2023-7-1',
      end_date: '2023-7-5',
      incharge_user: '鈴木',
      percentage: 100,
      },
      {
      id: 2,
      category_id: 1,
      name: 'テスト2',
      start_date: '2023-7-9',
      end_date: '2023-7-12',
      incharge_user: '佐藤',
      percentage: 90,
      },
      {
      id: 3,
      category_id: 1,
      name: 'テスト3',
      start_date: '2023-7-19',
      end_date: '2023-7-20',
      incharge_user: '鈴木',
      percentage: 40,
      },
      {
      id: 4,
      category_id: 1,
      name: 'テスト4',
      start_date: '2023-7-21',
      end_date: '2023-7-30',
      incharge_user: '山下',
      percentage: 60,
      },
      {
      id: 5,
      category_id: 1,
      name: 'テスト5',
      start_date: '2023-7-25',
      end_date: '2023-7-30',
      incharge_user: '佐藤',
      percentage: 5,
      },
      {
      id: 6,
      category_id: 2,
      name: 'テスト6',
      start_date: '2023-7-28',
      end_date: '2023-7-30',
      incharge_user: '佐藤',
      percentage: 0,
      },
  ],
};