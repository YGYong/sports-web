// 运动项目数据
export const exerciseTypes = [
  { id: 1, name: '跑步', icon: '/static/images/sports/paobu.png' },
  { id: 2, name: '哑铃', icon: '/static/images/sports/yaling.png' },
  { id: 3, name: '骑行', icon: '/static/images/sports/qixing.png' },
  { id: 4, name: '篮球', icon: '/static/images/sports/lanqiu.png' },
  { id: 5, name: '足球', icon: '/static/images/sports/zuqiu.png' },
  { id: 6, name: '计时器', icon: '/static/images/sports/jishiqi.png' },
  { id: 7, name: '记录', icon: '/static/images/sports/jilu.png' },
  { id: 8, name: '设置', icon: '/static/images/sports/shezhi.png' }
];

// 训练记录数据
export const trainingRecords = [
  {
    id: 't001',
    type: 1,
    typeName: '跑步',
    duration: 1800, // 秒数
    distance: 5.2, // 公里
    calories: 320,
    date: '2023-09-15 08:30:00',
    notes: '早晨跑步，感觉很好'
  },
  {
    id: 't002',
    type: 2,
    typeName: '健身',
    duration: 3600,
    calories: 450,
    date: '2023-09-14 18:20:00',
    exercises: ['深蹲', '卧推', '引体向上'],
    notes: '力量训练日'
  },
  {
    id: 't003',
    type: 3,
    typeName: '瑜伽',
    duration: 2700,
    calories: 180,
    date: '2023-09-13 07:00:00',
    notes: '晨间瑜伽'
  },
  {
    id: 't004',
    type: 1,
    typeName: '跑步',
    duration: 2400,
    distance: 6.8,
    calories: 410,
    date: '2023-09-12 17:30:00',
    notes: '下班后跑步'
  },
  {
    id: 't005',
    type: 5,
    typeName: '骑行',
    duration: 4500,
    distance: 30,
    calories: 520,
    date: '2023-09-10 09:45:00',
    notes: '周末自行车出行'
  }
];

// 训练计划数据
export const trainingPlans = [
  {
    id: 'p001',
    name: '5公里跑步计划',
    type: 1,
    typeName: '跑步',
    frequency: '每周3次',
    duration: 4, // 周数
    startDate: '2023-09-01',
    endDate: '2023-09-30',
    completed: false,
    progress: 45,
    sessions: [
      { day: '周一', description: '慢跑20分钟', completed: true },
      { day: '周三', description: '间歇跑：400米*6组', completed: true },
      { day: '周六', description: '长跑5公里', completed: false }
    ]
  },
  {
    id: 'p002',
    name: '增肌训练计划',
    type: 2,
    typeName: '健身',
    frequency: '每周4次',
    duration: 8, // 周数
    startDate: '2023-09-05',
    endDate: '2023-10-31',
    completed: false,
    progress: 20,
    sessions: [
      { day: '周一', description: '胸部 + 三头肌', completed: true },
      { day: '周二', description: '背部 + 二头肌', completed: false },
      { day: '周四', description: '腿部 + 肩部', completed: false },
      { day: '周五', description: '核心 + 有氧', completed: false }
    ]
  },
  {
    id: 'p003',
    name: '初级瑜伽计划',
    type: 3,
    typeName: '瑜伽',
    frequency: '每周5次',
    duration: 3, // 周数
    startDate: '2023-09-10',
    endDate: '2023-09-30',
    completed: false,
    progress: 30,
    sessions: [
      { day: '周一', description: '基础姿势练习', completed: true },
      { day: '周二', description: '流瑜伽', completed: true },
      { day: '周三', description: '核心力量', completed: false },
      { day: '周五', description: '柔韧性训练', completed: false },
      { day: '周日', description: '冥想与放松', completed: false }
    ]
  }
];

// 成长数据
export const growthData = {
  runningDistance: [
    { date: '2023-09-01', value: 3.2 },
    { date: '2023-09-05', value: 4.5 },
    { date: '2023-09-10', value: 5.0 },
    { date: '2023-09-15', value: 5.2 }
  ],
  workoutDuration: [
    { date: '2023-09-02', value: 45 }, // 分钟
    { date: '2023-09-09', value: 60 },
    { date: '2023-09-16', value: 75 }
  ],
  calories: [
    { date: '2023-09-01', value: 250 },
    { date: '2023-09-02', value: 320 },
    { date: '2023-09-05', value: 300 },
    { date: '2023-09-09', value: 400 },
    { date: '2023-09-10', value: 350 },
    { date: '2023-09-15', value: 380 },
    { date: '2023-09-16', value: 420 }
  ],
  consistency: [
    { week: '第1周', count: 3 },
    { week: '第2周', count: 4 },
    { week: '第3周', count: 3 }
  ]
};

// 用户数据
export const userData = {
  id: 'u001',
  nickname: '健身达人',
  avatar: '/static/images/avatar.png',
  gender: '男',
  height: 178, // 厘米
  weight: 70, // 公斤
  age: 28,
  goal: '增肌减脂',
  registerDate: '2023-09-01',
  totalWorkouts: 12,
  achievements: [
    { id: 'a001', name: '初来乍到', description: '完成第一次训练', date: '2023-09-01' },
    { id: 'a002', name: '坚持不懈', description: '连续5天训练', date: '2023-09-05' },
    { id: 'a003', name: '跑步新手', description: '累计跑步达到10公里', date: '2023-09-10' }
  ]
}; 