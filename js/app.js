// ============================================================
// FED 排課系統 - 主應用程式 (v2 - 6時段版)
// 資料來源：FED schedule 2026.08-11(1).xlsx
// ============================================================

const App = (() => {
  // ========== 常數 ==========
  const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  const DAY_LABELS = { MON: '星期一', TUE: '星期二', WED: '星期三', THU: '星期四', FRI: '星期五' };

  // 6 個時段 (來自 Excel 原始定義)
  const SLOTS = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'];
  const SLOT_LABELS = {
    S1: '上午 (09:30~11:15)',
    S2: '上午 (11:30~13:15)',
    S3: '下午 (13:30~15:15)',
    S4: '黃昏 (15:30~17:15)',
    S5: '晚上 (17:30~19:15)',
    S6: '晚上 (19:30~21:15)'
  };
  const SLOT_SHORT = {
    S1: 'AM1 09:30', S2: 'AM2 11:30', S3: 'PM1 13:30',
    S4: 'PM2 15:30', S5: 'EVE1 17:30', S6: 'EVE2 19:30'
  };
  const SLOT_TIME = {
    S1: '09:30~11:15', S2: '11:30~13:15', S3: '13:30~15:15',
    S4: '15:30~17:15', S5: '17:30~19:15', S6: '19:30~21:15'
  };

  const STORAGE_KEY = 'fed_scheduler_data_v2';

  // ========== 預設資料 (來源: FED schedule 2026.08-11(1).xlsx) ==========
  const DEFAULT_DATA = {
    courses: [
  {
    'id': 'CPED1001',
    'name': 'CPED1001',
    'studentCount': 1365,
    'capacityPerClass': 35,
    'allowedSports': ['Basketball', 'Football', 'Volleyball', 'Kinball', 'Handball', 'Baseball', 'Soccer', 'Korfball', 'Skipping Rope', 'Tchoukball']
  },
  {
    'id': 'CPED1002',
    'name': 'CPED1002',
    'studentCount': 1435,
    'capacityPerClass': 35,
    'allowedSports': ['Badminton', 'Pickle Ball', 'Yoga', 'Martial Arts', 'Table Tennis', 'Rock Climbing', 'Golf', 'Diabolo', 'Dance']
  }
],
    teachers: [
  {
    'id': 't1',
    'name': 'Walter',
    'color': '#3b82f6',
    'priority': 1,
    'maxDailyClasses': 4,
    'skills': ['Kinball', 'Rock Climbing'],
    'preferences': []
  },
  {
    'id': 't2',
    'name': 'Water',
    'color': '#ef4444',
    'priority': 2,
    'maxDailyClasses': 4,
    'skills': ['Pickle Ball'],
    'preferences': []
  },
  {
    'id': 't3',
    'name': 'Frankie',
    'color': '#22c55e',
    'priority': 3,
    'maxDailyClasses': 4,
    'skills': ['Volleyball'],
    'preferences': []
  },
  {
    'id': 't4',
    'name': 'Gasper',
    'color': '#f59e0b',
    'priority': 4,
    'maxDailyClasses': 4,
    'skills': ['Tchoukball', 'Table Tennis'],
    'preferences': []
  },
  {
    'id': 't5',
    'name': 'Leong Hung Po',
    'color': '#8b5cf6',
    'priority': 5,
    'maxDailyClasses': 4,
    'skills': ['Basketball'],
    'preferences': []
  },
  {
    'id': 't6',
    'name': '周健東',
    'color': '#ec4899',
    'priority': 6,
    'maxDailyClasses': 4,
    'skills': ['Handball'],
    'preferences': []
  },
  {
    'id': 't7',
    'name': 'Ip Kuai Wa',
    'color': '#14b8a6',
    'priority': 7,
    'maxDailyClasses': 4,
    'skills': ['Volleyball'],
    'preferences': []
  },
  {
    'id': 't8',
    'name': '陳海雄',
    'color': '#f97316',
    'priority': 8,
    'maxDailyClasses': 4,
    'skills': ['Basketball'],
    'preferences': []
  },
  {
    'id': 't9',
    'name': 'Xi Chengqing',
    'color': '#6366f1',
    'priority': 9,
    'maxDailyClasses': 4,
    'skills': ['Martial Arts'],
    'preferences': []
  },
  {
    'id': 't10',
    'name': '蘇慶大',
    'color': '#84cc16',
    'priority': 10,
    'maxDailyClasses': 4,
    'skills': ['Golf'],
    'preferences': []
  },
  {
    'id': 't11',
    'name': '馬燕紅',
    'color': '#06b6d4',
    'priority': 11,
    'maxDailyClasses': 4,
    'skills': ['Yoga'],
    'preferences': []
  },
  {
    'id': 't12',
    'name': '羅佩珊',
    'color': '#d946ef',
    'priority': 12,
    'maxDailyClasses': 4,
    'skills': ['Yoga'],
    'preferences': []
  },
  {
    'id': 't13',
    'name': 'Lai Weng Fat',
    'color': '#e11d48',
    'priority': 13,
    'maxDailyClasses': 4,
    'skills': ['Basketball'],
    'preferences': []
  },
  {
    'id': 't14',
    'name': 'Dr. Zhang Di',
    'color': '#0ea5e9',
    'priority': 14,
    'maxDailyClasses': 4,
    'skills': ['Soccer'],
    'preferences': []
  },
  {
    'id': 't15',
    'name': 'Leong Wai Man',
    'color': '#a855f7',
    'priority': 15,
    'maxDailyClasses': 4,
    'skills': ['Martial Arts'],
    'preferences': []
  },
  {
    'id': 't16',
    'name': 'Ka Chon LAM',
    'color': '#10b981',
    'priority': 16,
    'maxDailyClasses': 4,
    'skills': ['Diabolo'],
    'preferences': []
  }
],
    venues: [
  {
    'id': 'v_g001',
    'name': 'G001',
    'allowedSports': ['Handball', 'Baseball', 'Football', 'Soccer', 'Kinball', 'Volleyball']
  },
  {
    'id': 'v_g016',
    'name': 'G016',
    'allowedSports': ['Basketball', 'Volleyball', 'Korfball', 'Skipping Rope', 'Pickle Ball', 'Kinball', 'Golf', 'Diabolo', 'Tchoukball']
  },
  {
    'id': 'v_g028',
    'name': 'G028',
    'allowedSports': ['Basketball', 'Volleyball', 'Korfball', 'Skipping Rope', 'Pickle Ball', 'Kinball', 'Golf', 'Diabolo', 'Tchoukball']
  },
  {
    'id': 'v_badminton_hall',
    'name': 'Badminton Hall',
    'allowedSports': ['Badminton', 'Pickle Ball']
  },
  {
    'id': 'v_dance_room',
    'name': 'Dance Room 3008',
    'allowedSports': ['Dance', 'Yoga', 'Martial Arts']
  },
  {
    'id': 'v_table_tennis',
    'name': 'Table Tennis Room 3010',
    'allowedSports': ['Table Tennis']
  },
  {
    'id': 'v_climbing_wall',
    'name': 'Rock Climbing Wall',
    'allowedSports': ['Rock Climbing']
  }
],
    assignments: [
  {
    'teacherId': 't1',
    'courseId': 'CPED1001',
    'sport': 'Kinball',
    'classCount': 2
  },
  {
    'teacherId': 't1',
    'courseId': 'CPED1002',
    'sport': 'Rock Climbing',
    'classCount': 4
  },
  {
    'teacherId': 't2',
    'courseId': 'CPED1002',
    'sport': 'Pickle Ball',
    'classCount': 6
  },
  {
    'teacherId': 't3',
    'courseId': 'CPED1001',
    'sport': 'Volleyball',
    'classCount': 8
  },
  {
    'teacherId': 't4',
    'courseId': 'CPED1001',
    'sport': 'Tchoukball',
    'classCount': 2
  },
  {
    'teacherId': 't4',
    'courseId': 'CPED1002',
    'sport': 'Table Tennis',
    'classCount': 5
  },
  {
    'teacherId': 't5',
    'courseId': 'CPED1001',
    'sport': 'Basketball',
    'classCount': 4
  },
  {
    'teacherId': 't6',
    'courseId': 'CPED1001',
    'sport': 'Handball',
    'classCount': 4
  },
  {
    'teacherId': 't7',
    'courseId': 'CPED1001',
    'sport': 'Volleyball',
    'classCount': 4
  },
  {
    'teacherId': 't8',
    'courseId': 'CPED1001',
    'sport': 'Basketball',
    'classCount': 5
  },
  {
    'teacherId': 't9',
    'courseId': 'CPED1002',
    'sport': 'Martial Arts',
    'classCount': 4
  },
  {
    'teacherId': 't10',
    'courseId': 'CPED1002',
    'sport': 'Golf',
    'classCount': 4
  },
  {
    'teacherId': 't11',
    'courseId': 'CPED1002',
    'sport': 'Yoga',
    'classCount': 5
  },
  {
    'teacherId': 't12',
    'courseId': 'CPED1002',
    'sport': 'Yoga',
    'classCount': 5
  },
  {
    'teacherId': 't13',
    'courseId': 'CPED1001',
    'sport': 'Basketball',
    'classCount': 5
  },
  {
    'teacherId': 't14',
    'courseId': 'CPED1001',
    'sport': 'Soccer',
    'classCount': 5
  },
  {
    'teacherId': 't15',
    'courseId': 'CPED1002',
    'sport': 'Martial Arts',
    'classCount': 4
  },
  {
    'teacherId': 't16',
    'courseId': 'CPED1002',
    'sport': 'Diabolo',
    'classCount': 4
  }
],
    timetable: [
  {
    'id': 'tt_1',
    'day': 'MON',
    'slot': 'S1',
    'courseId': 'CPED1002',
    'classNumber': 1,
    'sport': 'Rock Climbing',
    'teacherId': 't1',
    'venueId': 'v_climbing_wall'
  },
  {
    'id': 'tt_2',
    'day': 'MON',
    'slot': 'S1',
    'courseId': 'CPED1001',
    'classNumber': 25,
    'sport': 'Basketball',
    'teacherId': 't8',
    'venueId': 'v_g016'
  },
  {
    'id': 'tt_3',
    'day': 'MON',
    'slot': 'S1',
    'courseId': 'CPED1002',
    'classNumber': 5,
    'sport': 'Pickle Ball',
    'teacherId': 't2',
    'venueId': 'v_badminton_hall'
  },
  {
    'id': 'tt_4',
    'day': 'MON',
    'slot': 'S1',
    'courseId': 'CPED1002',
    'classNumber': 28,
    'sport': 'Yoga',
    'teacherId': 't11',
    'venueId': 'v_dance_room'
  },
  {
    'id': 'tt_5',
    'day': 'TUE',
    'slot': 'S1',
    'courseId': 'CPED1002',
    'classNumber': 3,
    'sport': 'Rock Climbing',
    'teacherId': 't1',
    'venueId': 'v_climbing_wall'
  },
  {
    'id': 'tt_6',
    'day': 'TUE',
    'slot': 'S1',
    'courseId': 'CPED1001',
    'classNumber': 30,
    'sport': 'Basketball',
    'teacherId': 't13',
    'venueId': 'v_g028'
  },
  {
    'id': 'tt_7',
    'day': 'TUE',
    'slot': 'S1',
    'courseId': 'CPED1002',
    'classNumber': 7,
    'sport': 'Pickle Ball',
    'teacherId': 't2',
    'venueId': 'v_badminton_hall'
  },
  {
    'id': 'tt_8',
    'day': 'TUE',
    'slot': 'S1',
    'courseId': 'CPED1002',
    'classNumber': 31,
    'sport': 'Yoga',
    'teacherId': 't12',
    'venueId': 'v_dance_room'
  },
  {
    'id': 'tt_9',
    'day': 'WED',
    'slot': 'S1',
    'courseId': 'CPED1001',
    'classNumber': 1,
    'sport': 'Kinball',
    'teacherId': 't1',
    'venueId': 'v_g001'
  },
  {
    'id': 'tt_10',
    'day': 'WED',
    'slot': 'S1',
    'courseId': 'CPED1002',
    'classNumber': 9,
    'sport': 'Pickle Ball',
    'teacherId': 't2',
    'venueId': 'v_badminton_hall'
  },
  {
    'id': 'tt_11',
    'day': 'WED',
    'slot': 'S1',
    'courseId': 'CPED1001',
    'classNumber': 7,
    'sport': 'Volleyball',
    'teacherId': 't3',
    'venueId': 'v_g028'
  },
  {
    'id': 'tt_12',
    'day': 'WED',
    'slot': 'S1',
    'courseId': 'CPED1001',
    'classNumber': 29,
    'sport': 'Basketball',
    'teacherId': 't8',
    'venueId': 'v_g016'
  },
  {
    'id': 'tt_13',
    'day': 'THU',
    'slot': 'S1',
    'courseId': 'CPED1001',
    'classNumber': 15,
    'sport': 'Basketball',
    'teacherId': 't5',
    'venueId': 'v_g016'
  },
  {
    'id': 'tt_14',
    'day': 'THU',
    'slot': 'S1',
    'courseId': 'CPED1001',
    'classNumber': 32,
    'sport': 'Basketball',
    'teacherId': 't13',
    'venueId': 'v_g028'
  },
  {
    'id': 'tt_15',
    'day': 'THU',
    'slot': 'S1',
    'courseId': 'CPED1001',
    'classNumber': 9,
    'sport': 'Volleyball',
    'teacherId': 't3',
    'venueId': 'v_g001'
  },
  {
    'id': 'tt_16',
    'day': 'THU',
    'slot': 'S1',
    'courseId': 'CPED1002',
    'classNumber': 18,
    'sport': 'Martial Arts',
    'teacherId': 't9',
    'venueId': 'v_dance_room'
  },
  {
    'id': 'tt_17',
    'day': 'FRI',
    'slot': 'S1',
    'courseId': 'CPED1001',
    'classNumber': 27,
    'sport': 'Basketball',
    'teacherId': 't8',
    'venueId': 'v_g016'
  },
  {
    'id': 'tt_18',
    'day': 'MON',
    'slot': 'S2',
    'courseId': 'CPED1002',
    'classNumber': 2,
    'sport': 'Rock Climbing',
    'teacherId': 't1',
    'venueId': 'v_climbing_wall'
  },
  {
    'id': 'tt_19',
    'day': 'MON',
    'slot': 'S2',
    'courseId': 'CPED1001',
    'classNumber': 26,
    'sport': 'Basketball',
    'teacherId': 't8',
    'venueId': 'v_g016'
  },
  {
    'id': 'tt_20',
    'day': 'MON',
    'slot': 'S2',
    'courseId': 'CPED1002',
    'classNumber': 6,
    'sport': 'Pickle Ball',
    'teacherId': 't2',
    'venueId': 'v_badminton_hall'
  },
  {
    'id': 'tt_21',
    'day': 'TUE',
    'slot': 'S2',
    'courseId': 'CPED1002',
    'classNumber': 4,
    'sport': 'Rock Climbing',
    'teacherId': 't1',
    'venueId': 'v_climbing_wall'
  },
  {
    'id': 'tt_22',
    'day': 'TUE',
    'slot': 'S2',
    'courseId': 'CPED1001',
    'classNumber': 31,
    'sport': 'Basketball',
    'teacherId': 't13',
    'venueId': 'v_g028'
  },
  {
    'id': 'tt_23',
    'day': 'TUE',
    'slot': 'S2',
    'courseId': 'CPED1002',
    'classNumber': 8,
    'sport': 'Pickle Ball',
    'teacherId': 't2',
    'venueId': 'v_badminton_hall'
  },
  {
    'id': 'tt_24',
    'day': 'TUE',
    'slot': 'S2',
    'courseId': 'CPED1002',
    'classNumber': 32,
    'sport': 'Yoga',
    'teacherId': 't12',
    'venueId': 'v_dance_room'
  },
  {
    'id': 'tt_25',
    'day': 'WED',
    'slot': 'S2',
    'courseId': 'CPED1001',
    'classNumber': 2,
    'sport': 'Kinball',
    'teacherId': 't1',
    'venueId': 'v_g001'
  },
  {
    'id': 'tt_26',
    'day': 'WED',
    'slot': 'S2',
    'courseId': 'CPED1002',
    'classNumber': 10,
    'sport': 'Pickle Ball',
    'teacherId': 't2',
    'venueId': 'v_badminton_hall'
  },
  {
    'id': 'tt_27',
    'day': 'WED',
    'slot': 'S2',
    'courseId': 'CPED1002',
    'classNumber': 11,
    'sport': 'Table Tennis',
    'teacherId': 't4',
    'venueId': 'v_table_tennis'
  },
  {
    'id': 'tt_28',
    'day': 'WED',
    'slot': 'S2',
    'courseId': 'CPED1001',
    'classNumber': 8,
    'sport': 'Volleyball',
    'teacherId': 't3',
    'venueId': 'v_g016'
  },
  {
    'id': 'tt_29',
    'day': 'WED',
    'slot': 'S2',
    'courseId': 'CPED1001',
    'classNumber': 34,
    'sport': 'Basketball',
    'teacherId': 't13',
    'venueId': 'v_g028'
  },
  {
    'id': 'tt_30',
    'day': 'THU',
    'slot': 'S2',
    'courseId': 'CPED1001',
    'classNumber': 16,
    'sport': 'Basketball',
    'teacherId': 't5',
    'venueId': 'v_g016'
  },
  {
    'id': 'tt_31',
    'day': 'THU',
    'slot': 'S2',
    'courseId': 'CPED1001',
    'classNumber': 33,
    'sport': 'Basketball',
    'teacherId': 't13',
    'venueId': 'v_g028'
  },
  {
    'id': 'tt_32',
    'day': 'THU',
    'slot': 'S2',
    'courseId': 'CPED1002',
    'classNumber': 19,
    'sport': 'Martial Arts',
    'teacherId': 't9',
    'venueId': 'v_dance_room'
  },
  {
    'id': 'tt_33',
    'day': 'THU',
    'slot': 'S2',
    'courseId': 'CPED1001',
    'classNumber': 10,
    'sport': 'Volleyball',
    'teacherId': 't3',
    'venueId': 'v_g001'
  },
  {
    'id': 'tt_34',
    'day': 'FRI',
    'slot': 'S2',
    'courseId': 'CPED1001',
    'classNumber': 28,
    'sport': 'Basketball',
    'teacherId': 't8',
    'venueId': 'v_g016'
  },
  {
    'id': 'tt_35',
    'day': 'MON',
    'slot': 'S3',
    'courseId': 'CPED1001',
    'classNumber': 3,
    'sport': 'Volleyball',
    'teacherId': 't3',
    'venueId': 'v_g016'
  },
  {
    'id': 'tt_36',
    'day': 'MON',
    'slot': 'S3',
    'courseId': 'CPED1002',
    'classNumber': 29,
    'sport': 'Yoga',
    'teacherId': 't12',
    'venueId': 'v_dance_room'
  },
  {
    'id': 'tt_37',
    'day': 'TUE',
    'slot': 'S3',
    'courseId': 'CPED1001',
    'classNumber': 5,
    'sport': 'Volleyball',
    'teacherId': 't3',
    'venueId': 'v_g016'
  },
  {
    'id': 'tt_38',
    'day': 'TUE',
    'slot': 'S3',
    'courseId': 'CPED1001',
    'classNumber': 11,
    'sport': 'Tchoukball',
    'teacherId': 't4',
    'venueId': 'v_g028'
  },
  {
    'id': 'tt_39',
    'day': 'TUE',
    'slot': 'S3',
    'courseId': 'CPED1002',
    'classNumber': 16,
    'sport': 'Martial Arts',
    'teacherId': 't9',
    'venueId': 'v_dance_room'
  },
  {
    'id': 'tt_40',
    'day': 'WED',
    'slot': 'S3',
    'courseId': 'CPED1001',
    'classNumber': 13,
    'sport': 'Basketball',
    'teacherId': 't5',
    'venueId': 'v_g016'
  },
  {
    'id': 'tt_41',
    'day': 'WED',
    'slot': 'S3',
    'courseId': 'CPED1002',
    'classNumber': 20,
    'sport': 'Golf',
    'teacherId': 't10',
    'venueId': 'v_g028'
  },
  {
    'id': 'tt_42',
    'day': 'THU',
    'slot': 'S3',
    'courseId': 'CPED1002',
    'classNumber': 12,
    'sport': 'Table Tennis',
    'teacherId': 't4',
    'venueId': 'v_table_tennis'
  },
  {
    'id': 'tt_43',
    'day': 'THU',
    'slot': 'S3',
    'courseId': 'CPED1002',
    'classNumber': 22,
    'sport': 'Golf',
    'teacherId': 't10',
    'venueId': 'v_g028'
  },
  {
    'id': 'tt_44',
    'day': 'THU',
    'slot': 'S3',
    'courseId': 'CPED1002',
    'classNumber': 24,
    'sport': 'Yoga',
    'teacherId': 't11',
    'venueId': 'v_dance_room'
  },
  {
    'id': 'tt_45',
    'day': 'FRI',
    'slot': 'S3',
    'courseId': 'CPED1002',
    'classNumber': 14,
    'sport': 'Table Tennis',
    'teacherId': 't4',
    'venueId': 'v_table_tennis'
  },
  {
    'id': 'tt_46',
    'day': 'FRI',
    'slot': 'S3',
    'courseId': 'CPED1001',
    'classNumber': 37,
    'sport': 'Soccer',
    'teacherId': 't14',
    'venueId': 'v_g001'
  },
  {
    'id': 'tt_47',
    'day': 'FRI',
    'slot': 'S3',
    'courseId': 'CPED1002',
    'classNumber': 26,
    'sport': 'Yoga',
    'teacherId': 't11',
    'venueId': 'v_dance_room'
  },
  {
    'id': 'tt_48',
    'day': 'MON',
    'slot': 'S4',
    'courseId': 'CPED1001',
    'classNumber': 4,
    'sport': 'Volleyball',
    'teacherId': 't3',
    'venueId': 'v_g028'
  },
  {
    'id': 'tt_49',
    'day': 'MON',
    'slot': 'S4',
    'courseId': 'CPED1002',
    'classNumber': 30,
    'sport': 'Yoga',
    'teacherId': 't12',
    'venueId': 'v_dance_room'
  },
  {
    'id': 'tt_50',
    'day': 'TUE',
    'slot': 'S4',
    'courseId': 'CPED1001',
    'classNumber': 6,
    'sport': 'Volleyball',
    'teacherId': 't3',
    'venueId': 'v_g016'
  },
  {
    'id': 'tt_51',
    'day': 'TUE',
    'slot': 'S4',
    'courseId': 'CPED1001',
    'classNumber': 12,
    'sport': 'Tchoukball',
    'teacherId': 't4',
    'venueId': 'v_g028'
  },
  {
    'id': 'tt_52',
    'day': 'TUE',
    'slot': 'S4',
    'courseId': 'CPED1002',
    'classNumber': 17,
    'sport': 'Martial Arts',
    'teacherId': 't9',
    'venueId': 'v_dance_room'
  },
  {
    'id': 'tt_53',
    'day': 'WED',
    'slot': 'S4',
    'courseId': 'CPED1001',
    'classNumber': 14,
    'sport': 'Basketball',
    'teacherId': 't5',
    'venueId': 'v_g016'
  },
  {
    'id': 'tt_54',
    'day': 'WED',
    'slot': 'S4',
    'courseId': 'CPED1002',
    'classNumber': 21,
    'sport': 'Golf',
    'teacherId': 't10',
    'venueId': 'v_g028'
  },
  {
    'id': 'tt_55',
    'day': 'WED',
    'slot': 'S4',
    'courseId': 'CPED1002',
    'classNumber': 33,
    'sport': 'Yoga',
    'teacherId': 't12',
    'venueId': 'v_dance_room'
  },
  {
    'id': 'tt_56',
    'day': 'THU',
    'slot': 'S4',
    'courseId': 'CPED1002',
    'classNumber': 13,
    'sport': 'Table Tennis',
    'teacherId': 't4',
    'venueId': 'v_table_tennis'
  },
  {
    'id': 'tt_57',
    'day': 'THU',
    'slot': 'S4',
    'courseId': 'CPED1002',
    'classNumber': 23,
    'sport': 'Golf',
    'teacherId': 't10',
    'venueId': 'v_g028'
  },
  {
    'id': 'tt_58',
    'day': 'THU',
    'slot': 'S4',
    'courseId': 'CPED1002',
    'classNumber': 25,
    'sport': 'Yoga',
    'teacherId': 't11',
    'venueId': 'v_dance_room'
  },
  {
    'id': 'tt_59',
    'day': 'FRI',
    'slot': 'S4',
    'courseId': 'CPED1002',
    'classNumber': 15,
    'sport': 'Table Tennis',
    'teacherId': 't4',
    'venueId': 'v_table_tennis'
  },
  {
    'id': 'tt_60',
    'day': 'FRI',
    'slot': 'S4',
    'courseId': 'CPED1001',
    'classNumber': 38,
    'sport': 'Soccer',
    'teacherId': 't14',
    'venueId': 'v_g001'
  },
  {
    'id': 'tt_61',
    'day': 'FRI',
    'slot': 'S4',
    'courseId': 'CPED1002',
    'classNumber': 27,
    'sport': 'Yoga',
    'teacherId': 't11',
    'venueId': 'v_dance_room'
  },
  {
    'id': 'tt_62',
    'day': 'MON',
    'slot': 'S5',
    'courseId': 'CPED1001',
    'classNumber': 21,
    'sport': 'Volleyball',
    'teacherId': 't7',
    'venueId': 'v_g028'
  },
  {
    'id': 'tt_63',
    'day': 'MON',
    'slot': 'S5',
    'courseId': 'CPED1001',
    'classNumber': 17,
    'sport': 'Handball',
    'teacherId': 't6',
    'venueId': 'v_g001'
  },
  {
    'id': 'tt_64',
    'day': 'TUE',
    'slot': 'S5',
    'courseId': 'CPED1001',
    'classNumber': 19,
    'sport': 'Handball',
    'teacherId': 't6',
    'venueId': 'v_g001'
  },
  {
    'id': 'tt_65',
    'day': 'WED',
    'slot': 'S5',
    'courseId': 'CPED1001',
    'classNumber': 23,
    'sport': 'Volleyball',
    'teacherId': 't7',
    'venueId': 'v_g028'
  },
  {
    'id': 'tt_66',
    'day': 'WED',
    'slot': 'S5',
    'courseId': 'CPED1001',
    'classNumber': 39,
    'sport': 'Soccer',
    'teacherId': 't14',
    'venueId': 'v_g001'
  },
  {
    'id': 'tt_67',
    'day': 'THU',
    'slot': 'S5',
    'courseId': 'CPED1002',
    'classNumber': 36,
    'sport': 'Martial Arts',
    'teacherId': 't15',
    'venueId': 'v_dance_room'
  },
  {
    'id': 'tt_68',
    'day': 'THU',
    'slot': 'S5',
    'courseId': 'CPED1001',
    'classNumber': 35,
    'sport': 'Soccer',
    'teacherId': 't14',
    'venueId': 'v_g001'
  },
  {
    'id': 'tt_69',
    'day': 'MON',
    'slot': 'S6',
    'courseId': 'CPED1001',
    'classNumber': 22,
    'sport': 'Volleyball',
    'teacherId': 't7',
    'venueId': 'v_g028'
  },
  {
    'id': 'tt_70',
    'day': 'MON',
    'slot': 'S6',
    'courseId': 'CPED1002',
    'classNumber': 38,
    'sport': 'Diabolo',
    'teacherId': 't16',
    'venueId': 'v_g016'
  },
  {
    'id': 'tt_71',
    'day': 'MON',
    'slot': 'S6',
    'courseId': 'CPED1002',
    'classNumber': 34,
    'sport': 'Martial Arts',
    'teacherId': 't15',
    'venueId': 'v_dance_room'
  },
  {
    'id': 'tt_72',
    'day': 'TUE',
    'slot': 'S6',
    'courseId': 'CPED1002',
    'classNumber': 41,
    'sport': 'Diabolo',
    'teacherId': 't16',
    'venueId': 'v_g016'
  },
  {
    'id': 'tt_73',
    'day': 'TUE',
    'slot': 'S6',
    'courseId': 'CPED1001',
    'classNumber': 20,
    'sport': 'Handball',
    'teacherId': 't6',
    'venueId': 'v_g001'
  },
  {
    'id': 'tt_74',
    'day': 'WED',
    'slot': 'S6',
    'courseId': 'CPED1001',
    'classNumber': 24,
    'sport': 'Volleyball',
    'teacherId': 't7',
    'venueId': 'v_g028'
  },
  {
    'id': 'tt_75',
    'day': 'WED',
    'slot': 'S6',
    'courseId': 'CPED1002',
    'classNumber': 35,
    'sport': 'Martial Arts',
    'teacherId': 't15',
    'venueId': 'v_dance_room'
  },
  {
    'id': 'tt_76',
    'day': 'WED',
    'slot': 'S6',
    'courseId': 'CPED1002',
    'classNumber': 39,
    'sport': 'Diabolo',
    'teacherId': 't16',
    'venueId': 'v_g016'
  },
  {
    'id': 'tt_77',
    'day': 'THU',
    'slot': 'S6',
    'courseId': 'CPED1002',
    'classNumber': 37,
    'sport': 'Martial Arts',
    'teacherId': 't15',
    'venueId': 'v_dance_room'
  },
  {
    'id': 'tt_78',
    'day': 'THU',
    'slot': 'S6',
    'courseId': 'CPED1001',
    'classNumber': 36,
    'sport': 'Soccer',
    'teacherId': 't14',
    'venueId': 'v_g001'
  },
  {
    'id': 'tt_79',
    'day': 'THU',
    'slot': 'S6',
    'courseId': 'CPED1002',
    'classNumber': 40,
    'sport': 'Diabolo',
    'teacherId': 't16',
    'venueId': 'v_g016'
  },
  {
    'id': 'tt_80',
    'day': 'MON',
    'slot': 'S6',
    'courseId': 'CPED1001',
    'classNumber': 18,
    'sport': 'Handball',
    'teacherId': 't6',
    'venueId': 'v_g001'
  }
]
  };

  // ========== 狀態 ==========
  let data = null;
  let selectedTeacherFilter = null;

  // ========== 初始化 ==========
  function init() {
    loadData();
    switchTab('dashboard');
  }

  function loadData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        data = JSON.parse(stored);
        data.courses = data.courses || [];
        data.teachers = data.teachers || [];
        data.venues = data.venues || [];
        data.assignments = data.assignments || [];
        data.timetable = data.timetable || [];
      } catch (e) {
        console.error('資料載入失敗，使用預設資料:', e);
        data = JSON.parse(JSON.stringify(DEFAULT_DATA));
      }
    } else {
      data = JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
    saveData();
  }

  function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function resetData() {
    if (confirm('確定要重設所有資料為預設值嗎？這將會覆蓋所有已修改的內容。')) {
      data = JSON.parse(JSON.stringify(DEFAULT_DATA));
      saveData();
      refreshCurrentTab();
    }
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fed_scheduler_backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importJSON(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const imported = JSON.parse(e.target.result);
        if (!imported.courses || !imported.teachers || !imported.venues) {
          alert('無效的資料格式：缺少必要欄位 (courses, teachers, venues)');
          return;
        }
        if (confirm('確定要匯入此 JSON 檔案嗎？目前資料將會被覆蓋。')) {
          data = imported;
          saveData();
          refreshCurrentTab();
          alert('資料匯入成功！');
        }
      } catch (err) {
        alert('JSON 解析失敗：' + err.message);
      }
    };
    reader.readAsText(file);
    input.value = '';
  }

  // ========== 分頁切換 ==========
  function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.tab-btn[onclick*="${tab}"]`);
    if (btn) btn.classList.add('active');
    const content = document.getElementById('app-content');
    switch (tab) {
      case 'dashboard': renderDashboard(content); break;
      case 'courses': renderCourses(content); break;
      case 'teachers': renderTeachers(content); break;
      case 'venues': renderVenues(content); break;
      case 'assignments': renderAssignments(content); break;
      case 'timetable': renderTimetable(content); break;
      case 'export': renderExport(content); break;
    }
  }

  function refreshCurrentTab() {
    const activeBtn = document.querySelector('.tab-btn.active');
    if (activeBtn) {
      const onclick = activeBtn.getAttribute('onclick');
      const match = onclick.match(/'([^']+)'/);
      if (match) switchTab(match[1]);
    }
  }

  // ========== Helper Functions ==========
  function getTeacher(id) { return data.teachers.find(t => t.id === id); }
  function getCourse(id) { return data.courses.find(c => c.id === id); }
  function getVenue(id) { return data.venues.find(v => v.id === id); }
  function getClassCount(courseId) { const c = getCourse(courseId); return c ? Math.ceil(c.studentCount / c.capacityPerClass) : 0; }
  function findVenuesForSport(sport) { return data.venues.filter(v => v.allowedSports.includes(sport)); }
  function generateId() { return 'id_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7); }

  // ========== 總覽 (Dashboard) ==========
  function renderDashboard(container) {
    const totalClasses = data.courses.reduce((s, c) => s + Math.ceil(c.studentCount / c.capacityPerClass), 0);
    const assignedClasses = data.assignments.reduce((s, a) => s + a.classCount, 0);
    const missingClasses = totalClasses - assignedClasses;
    const timetableEntries = data.timetable.length;

    container.innerHTML = `
      <h2>📊 系統總覽</h2>
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-value">${data.courses.length}</div><div class="stat-label">課程數量</div></div>
        <div class="stat-card"><div class="stat-value">${totalClasses}</div><div class="stat-label">總班數</div></div>
        <div class="stat-card"><div class="stat-value">${data.teachers.length}</div><div class="stat-label">教師人數</div></div>
        <div class="stat-card"><div class="stat-value">${data.venues.length}</div><div class="stat-label">場地數量</div></div>
        <div class="stat-card"><div class="stat-value" style="color:${assignedClasses >= totalClasses ? 'var(--success)' : 'var(--danger)'}">${assignedClasses}/${totalClasses}</div><div class="stat-label">已配置 / 總班數</div></div>
        <div class="stat-card"><div class="stat-value" style="color:${timetableEntries >= assignedClasses ? 'var(--success)' : 'var(--warning)'}">${timetableEntries}</div><div class="stat-label">已排課堂數</div></div>
      </div>
      ${missingClasses > 0 ? `<div class="alert alert-warning mt-2">⚠️ 尚欠授課配置：<strong>${missingClasses}</strong> 班</div>` :
        assignedClasses > totalClasses ? `<div class="alert alert-danger mt-2">⚠️ 授課配置超出 ${Math.abs(missingClasses)} 班</div>` :
        `<div class="alert alert-success mt-2">✅ 授課配置已足夠</div>`}
      <div class="card mt-2"><h3>課程概覽</h3><div class="table-wrap"><table>
        <tr><th>課程</th><th>學生人數</th><th>每班容量</th><th>班數</th><th>已配置</th><th>狀態</th></tr>
        ${data.courses.map(c => {
          const cc = Math.ceil(c.studentCount / c.capacityPerClass);
          const asgn = data.assignments.filter(a => a.courseId === c.id).reduce((s,a) => s + a.classCount, 0);
          const st = asgn >= cc ? '<span class="tag tag-green">足夠</span>' : asgn > 0 ? '<span class="tag tag-yellow">部分</span>' : '<span class="tag tag-red">未配置</span>';
          return `<tr><td><strong>${c.name}</strong></td><td>${c.studentCount}</td><td>${c.capacityPerClass}</td><td>${cc}</td><td>${asgn}</td><td>${st}</td></tr>`;
        }).join('')}
      </table></div></div>`;
  }

  // ========== 課程管理 ==========
  function renderCourses(container) {
    container.innerHTML = `
      <div class="flex-between"><h2>📚 課程及班數管理</h2><button class="btn btn-primary" onclick="App.showAddCourseModal()">➕ 新增課程</button></div>
      <div class="card"><div class="table-wrap"><table>
        <tr><th>課程代碼</th><th>課程名稱</th><th>學生人數</th><th>每班容量</th><th>計算班數</th><th>可進行項目</th><th>操作</th></tr>
        ${data.courses.map(c => {
          const cc = Math.ceil(c.studentCount / c.capacityPerClass);
          return `<tr>
            <td><strong>${c.id}</strong></td><td>${c.name}</td>
            <td><input type="number" value="${c.studentCount}" onchange="App.updateCourse('${c.id}','studentCount',parseInt(this.value))" style="width:100px;"></td>
            <td><input type="number" value="${c.capacityPerClass}" onchange="App.updateCourse('${c.id}','capacityPerClass',parseInt(this.value))" style="width:80px;"></td>
            <td><strong>${cc}</strong> 班</td>
            <td>${c.allowedSports.map(s => `<span class="tag tag-blue">${s}</span>`).join(' ')}</td>
            <td><button class="btn btn-sm" onclick="App.showEditCourseSports('${c.id}')">✏️ 項目</button>
            <button class="btn btn-sm btn-danger" onclick="App.deleteCourse('${c.id}')">🗑️</button></td></tr>`;
        }).join('')}
      </table></div></div>`;
  }

  function showAddCourseModal() {
    const modal = document.createElement('div'); modal.className = 'modal-overlay show';
    modal.innerHTML = `<div class="modal"><h3>新增課程</h3>
      <div class="form-group"><label>課程代碼</label><input id="newCourseId"></div>
      <div class="form-group"><label>課程名稱</label><input id="newCourseName"></div>
      <div class="form-row"><div class="form-group"><label>學生人數</label><input id="newCourseStudents" type="number" value="100"></div>
      <div class="form-group"><label>每班容量</label><input id="newCourseCap" type="number" value="35"></div></div>
      <div class="form-group"><label>可進行運動項目（逗號分隔）</label><input id="newCourseSports" placeholder="Basketball, Football"></div>
      <div class="modal-actions"><button class="btn" onclick="this.closest('.modal-overlay').remove()">取消</button>
      <button class="btn btn-primary" onclick="App.addCourse()">新增</button></div></div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  }

  function addCourse() {
    const id = document.getElementById('newCourseId').value.trim();
    const name = document.getElementById('newCourseName').value.trim();
    const sc = parseInt(document.getElementById('newCourseStudents').value) || 0;
    const cap = parseInt(document.getElementById('newCourseCap').value) || 35;
    const sports = document.getElementById('newCourseSports').value.split(',').map(s => s.trim()).filter(s => s);
    if (!id || !name) { alert('請填寫課程代碼和名稱'); return; }
    if (data.courses.find(c => c.id === id)) { alert('課程代碼已存在'); return; }
    data.courses.push({ id, name, studentCount: sc, capacityPerClass: cap, allowedSports: sports });
    saveData(); document.querySelector('.modal-overlay')?.remove(); switchTab('courses');
  }

  function updateCourse(id, field, value) {
    const c = getCourse(id); if (!c || isNaN(value) || value < 1) return;
    c[field] = value; saveData();
  }

  function showEditCourseSports(id) {
    const c = getCourse(id); if (!c) return;
    const modal = document.createElement('div'); modal.className = 'modal-overlay show';
    modal.innerHTML = `<div class="modal"><h3>編輯「${c.name}」可進行項目</h3>
      <div class="form-group"><label>運動項目（逗號分隔）</label><input id="editSportsInput" value="${c.allowedSports.join(', ')}"></div>
      <div class="modal-actions"><button class="btn" onclick="this.closest('.modal-overlay').remove()">取消</button>
      <button class="btn btn-primary" onclick="App.saveCourseSports('${id}')">儲存</button></div></div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  }

  function saveCourseSports(id) {
    const c = getCourse(id); if (!c) return;
    c.allowedSports = document.getElementById('editSportsInput').value.split(',').map(s => s.trim()).filter(s => s);
    saveData(); document.querySelector('.modal-overlay')?.remove(); switchTab('courses');
  }

  function deleteCourse(id) {
    if (!confirm('確定要刪除此課程嗎？相關的授課配置也會被刪除。')) return;
    data.courses = data.courses.filter(c => c.id !== id);
    data.assignments = data.assignments.filter(a => a.courseId !== id);
    data.timetable = data.timetable.filter(t => t.courseId !== id);
    saveData(); switchTab('courses');
  }

  // ========== 教師管理 ==========
  function renderTeachers(container) {
    container.innerHTML = `<div class="flex-between"><h2>👨‍🏫 教學人員管理</h2>
      <button class="btn btn-primary" onclick="App.showAddTeacherModal()">➕ 新增教師</button></div>
      ${data.teachers.map(t => renderTeacherCard(t)).join('')}`;
  }

  function renderTeacherCard(t) {
    const assigned = data.assignments.filter(a => a.teacherId === t.id);
    const totalAssigned = assigned.reduce((s, a) => s + a.classCount, 0);
    return `<div class="card">
      <div class="card-header"><h3><span class="color-dot" style="background:${t.color}"></span>${t.name} <span class="text-sm">(優先: ${t.priority})</span></h3>
      <div><button class="btn btn-sm" onclick="App.showEditTeacherModal('${t.id}')">✏️ 編輯</button>
      <button class="btn btn-sm btn-danger" onclick="App.deleteTeacher('${t.id}')">🗑️</button></div></div>
      <div class="form-row">
        <div class="form-group"><label>顏色</label><input type="color" value="${t.color}" onchange="App.updateTeacher('${t.id}','color',this.value)" style="width:60px;height:30px;"></div>
        <div class="form-group"><label>優先次序</label><input type="number" value="${t.priority}" onchange="App.updateTeacher('${t.id}','priority',parseInt(this.value))" style="width:80px;"></div>
        <div class="form-group"><label>每日上限</label><input type="number" value="${t.maxDailyClasses}" onchange="App.updateTeacher('${t.id}','maxDailyClasses',parseInt(this.value))" style="width:80px;"></div>
      </div>
      <div class="form-group"><label>技能（運動項目）</label>
        <div style="display:flex;gap:4px;flex-wrap:wrap;">
          ${t.skills.map(s => `<span class="tag tag-blue">${s} <span style="cursor:pointer;" onclick="App.removeTeacherSkill('${t.id}','${s}')">×</span></span>`).join('')}
          <button class="btn btn-xs" onclick="App.showAddSkillModal('${t.id}')">➕ 新增技能</button></div></div>
      <div class="form-group"><label>偏好日子及時段</label>
        <ul class="pref-list">${[...t.preferences].sort((a,b) => a.order - b.order).map((p, i) => `
          <li><span class="pref-order">#${p.order}</span><span>${DAY_LABELS[p.day]}｜${SLOT_SHORT[p.slot]}</span><span style="flex:1"></span>
          <button class="btn btn-xs" onclick="App.moveTeacherPref('${t.id}',${t.preferences.indexOf(p)},-1)" ${i===0?'disabled':''}>▲</button>
          <button class="btn btn-xs" onclick="App.moveTeacherPref('${t.id}',${t.preferences.indexOf(p)},1)" ${i===t.preferences.length-1?'disabled':''}>▼</button>
          <span style="cursor:pointer;color:var(--danger);margin-left:4px;" onclick="App.removeTeacherPref('${t.id}',${t.preferences.indexOf(p)})">✕</span></li>`).join('')}</ul>
        <button class="btn btn-sm mt-2" onclick="App.showAddPrefModal('${t.id}')">➕ 新增偏好</button></div>
      <div><strong>已配置授課：${totalAssigned} 班</strong></div>
      ${assigned.length > 0 ? `<div class="mt-2">${assigned.map(a => { const c = getCourse(a.courseId); return `<span class="tag tag-green">${c?c.name:a.courseId}｜${a.sport}｜${a.classCount}班</span>`; }).join(' ')}</div>` : ''}
    </div>`;
  }

  function showAddTeacherModal() {
    const modal = document.createElement('div'); modal.className = 'modal-overlay show';
    modal.innerHTML = `<div class="modal"><h3>新增教師</h3>
      <div class="form-row"><div class="form-group"><label>姓名</label><input id="newTeacherName"></div>
      <div class="form-group"><label>顏色</label><input type="color" id="newTeacherColor" value="#3b82f6"></div></div>
      <div class="form-row"><div class="form-group"><label>優先次序</label><input type="number" id="newTeacherPriority" value="${data.teachers.length+1}"></div>
      <div class="form-group"><label>每日上限</label><input type="number" id="newTeacherMax" value="4"></div></div>
      <div class="form-group"><label>技能（逗號分隔）</label><input id="newTeacherSkills" placeholder="Basketball, Football"></div>
      <div class="modal-actions"><button class="btn" onclick="this.closest('.modal-overlay').remove()">取消</button>
      <button class="btn btn-primary" onclick="App.addTeacher()">新增</button></div></div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  }

  function addTeacher() {
    const name = document.getElementById('newTeacherName').value.trim();
    if (!name) { alert('請填寫教師姓名'); return; }
    data.teachers.push({
      id: generateId(), name, color: document.getElementById('newTeacherColor').value,
      priority: parseInt(document.getElementById('newTeacherPriority').value) || data.teachers.length + 1,
      maxDailyClasses: parseInt(document.getElementById('newTeacherMax').value) || 4,
      skills: document.getElementById('newTeacherSkills').value.split(',').map(s => s.trim()).filter(s => s),
      preferences: []
    });
    saveData(); document.querySelector('.modal-overlay')?.remove(); switchTab('teachers');
  }

  function showEditTeacherModal(id) {
    const t = getTeacher(id); if (!t) return;
    const modal = document.createElement('div'); modal.className = 'modal-overlay show';
    modal.innerHTML = `<div class="modal"><h3>編輯：${t.name}</h3>
      <div class="form-row"><div class="form-group"><label>姓名</label><input id="editTeacherName" value="${t.name}"></div>
      <div class="form-group"><label>顏色</label><input type="color" id="editTeacherColor" value="${t.color}"></div></div>
      <div class="form-row"><div class="form-group"><label>優先次序</label><input type="number" id="editTeacherPriority" value="${t.priority}"></div>
      <div class="form-group"><label>每日上限</label><input type="number" id="editTeacherMax" value="${t.maxDailyClasses}"></div></div>
      <div class="form-group"><label>技能（逗號分隔）</label><input id="editTeacherSkills" value="${t.skills.join(', ')}"></div>
      <div class="modal-actions"><button class="btn" onclick="this.closest('.modal-overlay').remove()">取消</button>
      <button class="btn btn-primary" onclick="App.saveEditTeacher('${id}')">儲存</button></div></div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  }

  function saveEditTeacher(id) {
    const t = getTeacher(id); if (!t) return;
    t.name = document.getElementById('editTeacherName').value.trim();
    t.color = document.getElementById('editTeacherColor').value;
    t.priority = parseInt(document.getElementById('editTeacherPriority').value) || t.priority;
    t.maxDailyClasses = parseInt(document.getElementById('editTeacherMax').value) || t.maxDailyClasses;
    t.skills = document.getElementById('editTeacherSkills').value.split(',').map(s => s.trim()).filter(s => s);
    saveData(); document.querySelector('.modal-overlay')?.remove(); switchTab('teachers');
  }

  function updateTeacher(id, field, value) { const t = getTeacher(id); if (!t) return; t[field] = value; saveData(); }
  function deleteTeacher(id) {
    if (!confirm('確定要刪除此教師嗎？相關的授課配置和課表也會被刪除。')) return;
    data.teachers = data.teachers.filter(t => t.id !== id);
    data.assignments = data.assignments.filter(a => a.teacherId !== id);
    data.timetable = data.timetable.filter(t => t.teacherId !== id);
    saveData(); switchTab('teachers');
  }

  function removeTeacherSkill(tid, skill) {
    const t = getTeacher(tid); if (!t) return;
    t.skills = t.skills.filter(s => s !== skill); saveData(); switchTab('teachers');
  }

  function showAddSkillModal(tid) {
    const t = getTeacher(tid); if (!t) return;
    const modal = document.createElement('div'); modal.className = 'modal-overlay show';
    modal.innerHTML = `<div class="modal"><h3>為「${t.name}」新增技能</h3>
      <div class="form-group"><label>運動項目</label><input id="newSkillInput"></div>
      <div class="modal-actions"><button class="btn" onclick="this.closest('.modal-overlay').remove()">取消</button>
      <button class="btn btn-primary" onclick="App.addTeacherSkill('${tid}')">新增</button></div></div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  }

  function addTeacherSkill(tid) {
    const t = getTeacher(tid); if (!t) return;
    const skill = document.getElementById('newSkillInput').value.trim();
    if (!skill) { alert('請輸入運動項目'); return; }
    if (!t.skills.includes(skill)) t.skills.push(skill);
    saveData(); document.querySelector('.modal-overlay')?.remove(); switchTab('teachers');
  }

  function removeTeacherPref(tid, index) {
    const t = getTeacher(tid); if (!t) return;
    t.preferences.splice(index, 1);
    t.preferences.forEach((p, i) => p.order = i + 1);
    saveData(); switchTab('teachers');
  }

  function moveTeacherPref(tid, index, direction) {
    const t = getTeacher(tid); if (!t) return;
    const ni = index + direction;
    if (ni < 0 || ni >= t.preferences.length) return;
    const tmp = t.preferences[index];
    t.preferences[index] = t.preferences[ni];
    t.preferences[ni] = tmp;
    t.preferences.forEach((p, i) => p.order = i + 1);
    saveData(); switchTab('teachers');
  }

  function showAddPrefModal(tid) {
    const t = getTeacher(tid); if (!t) return;
    const modal = document.createElement('div'); modal.className = 'modal-overlay show';
    modal.innerHTML = `<div class="modal"><h3>為「${t.name}」新增偏好</h3>
      <div class="form-row"><div class="form-group"><label>星期</label>
      <select id="newPrefDay">${DAYS.map(d => `<option value="${d}">${DAY_LABELS[d]}</option>`).join('')}</select></div>
      <div class="form-group"><label>時段</label>
      <select id="newPrefSlot">${SLOTS.map(s => `<option value="${s}">${SLOT_LABELS[s]}</option>`).join('')}</select></div></div>
      <div class="modal-actions"><button class="btn" onclick="this.closest('.modal-overlay').remove()">取消</button>
      <button class="btn btn-primary" onclick="App.addTeacherPref('${tid}')">新增</button></div></div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  }

  function addTeacherPref(tid) {
    const t = getTeacher(tid); if (!t) return;
    const day = document.getElementById('newPrefDay').value;
    const slot = document.getElementById('newPrefSlot').value;
    if (t.preferences.find(p => p.day === day && p.slot === slot)) { alert('此偏好已存在'); return; }
    t.preferences.push({ day, slot, order: t.preferences.length + 1 });
    saveData(); document.querySelector('.modal-overlay')?.remove(); switchTab('teachers');
  }

  // ========== 場地管理 ==========
  function renderVenues(container) {
    container.innerHTML = `<div class="flex-between"><h2>🏟️ 場地管理</h2>
      <button class="btn btn-primary" onclick="App.showAddVenueModal()">➕ 新增場地</button></div>
      ${data.venues.map(v => `<div class="card"><div class="card-header"><h3>${v.name}</h3>
      <div><button class="btn btn-sm" onclick="App.showEditVenueSports('${v.id}')">✏️ 項目</button>
      <button class="btn btn-sm btn-danger" onclick="App.deleteVenue('${v.id}')">🗑️</button></div></div>
      <div><strong>可進行項目：</strong>${v.allowedSports.length > 0 ? v.allowedSports.map(s => `<span class="tag tag-blue">${s}</span>`).join(' ') : '<span class="text-sm">未設定</span>'}</div></div>`).join('')}`;
  }

  function showAddVenueModal() {
    const modal = document.createElement('div'); modal.className = 'modal-overlay show';
    modal.innerHTML = `<div class="modal"><h3>新增場地</h3>
      <div class="form-group"><label>場地名稱</label><input id="newVenueName"></div>
      <div class="form-group"><label>可進行項目（逗號分隔）</label><input id="newVenueSports" placeholder="Basketball, Volleyball"></div>
      <div class="modal-actions"><button class="btn" onclick="this.closest('.modal-overlay').remove()">取消</button>
      <button class="btn btn-primary" onclick="App.addVenue()">新增</button></div></div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  }

  function addVenue() {
    const name = document.getElementById('newVenueName').value.trim();
    if (!name) { alert('請填寫場地名稱'); return; }
    const sports = document.getElementById('newVenueSports').value.split(',').map(s => s.trim()).filter(s => s);
    data.venues.push({ id: generateId(), name, allowedSports: sports });
    saveData(); document.querySelector('.modal-overlay')?.remove(); switchTab('venues');
  }

  function showEditVenueSports(id) {
    const v = getVenue(id); if (!v) return;
    const modal = document.createElement('div'); modal.className = 'modal-overlay show';
    modal.innerHTML = `<div class="modal"><h3>編輯「${v.name}」可進行項目</h3>
      <div class="form-group"><label>運動項目（逗號分隔）</label><input id="editVenueSportsInput" value="${v.allowedSports.join(', ')}"></div>
      <div class="modal-actions"><button class="btn" onclick="this.closest('.modal-overlay').remove()">取消</button>
      <button class="btn btn-primary" onclick="App.saveVenueSports('${id}')">儲存</button></div></div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  }

  function saveVenueSports(id) {
    const v = getVenue(id); if (!v) return;
    v.allowedSports = document.getElementById('editVenueSportsInput').value.split(',').map(s => s.trim()).filter(s => s);
    saveData(); document.querySelector('.modal-overlay')?.remove(); switchTab('venues');
  }

  function deleteVenue(id) {
    if (!confirm('確定要刪除此場地嗎？')) return;
    data.venues = data.venues.filter(v => v.id !== id);
    saveData(); switchTab('venues');
  }

  // ========== 授課配置 ==========
  function renderAssignments(container) {
    container.innerHTML = `<div class="flex-between"><h2>⚙️ 授課配置</h2>
      <button class="btn btn-primary" onclick="App.showAddAssignmentModal()">➕ 新增配置</button></div>
      <div class="card"><h3>配置摘要</h3>
      ${data.courses.map(c => {
        const cc = Math.ceil(c.studentCount / c.capacityPerClass);
        const asgn = data.assignments.filter(a => a.courseId === c.id).reduce((s,a) => s + a.classCount, 0);
        const rem = cc - asgn;
        return `<div style="margin-bottom:8px;"><strong>${c.name}</strong>：需要 <strong>${cc}</strong> 班，已配置 <strong>${asgn}</strong> 班
          ${rem > 0 ? `<span class="tag tag-red">尚欠 ${rem} 班</span>` : rem < 0 ? `<span class="tag tag-yellow">超出 ${Math.abs(rem)} 班</span>` : `<span class="tag tag-green">已足夠</span>`}</div>`;
      }).join('')}</div>
      <div class="card"><div class="table-wrap"><table>
        <tr><th>教師</th><th>課程</th><th>運動項目</th><th>班數</th><th>檢查</th><th>操作</th></tr>
        ${data.assignments.map((a, idx) => {
          const t = getTeacher(a.teacherId); const c = getCourse(a.courseId);
          const hasSkill = t && t.skills.includes(a.sport);
          const sportOk = c && c.allowedSports.includes(a.sport);
          return `<tr><td><span class="color-dot" style="background:${t?t.color:'#ccc'}"></span>${t?t.name:'?'}</td>
          <td>${c?c.name:a.courseId}</td><td>${a.sport}</td>
          <td><input type="number" value="${a.classCount}" onchange="App.updateAssignment(${idx},'classCount',parseInt(this.value))" style="width:70px;"></td>
          <td>${!hasSkill?'<span class="tag tag-red">⚠️ 無技能</span>':''}${!sportOk?'<span class="tag tag-yellow">⚠️ 課程不含</span>':''}${hasSkill&&sportOk?'<span class="tag tag-green">✅</span>':''}</td>
          <td><button class="btn btn-sm btn-danger" onclick="App.deleteAssignment(${idx})">🗑️</button></td></tr>`;
        }).join('')}
        ${data.assignments.length === 0 ? '<tr><td colspan="6" class="text-center text-sm">暫無配置</td></tr>' : ''}
      </table></div></div>`;
  }

  function showAddAssignmentModal() {
    const modal = document.createElement('div'); modal.className = 'modal-overlay show';
    modal.innerHTML = `<div class="modal"><h3>新增授課配置</h3>
      <div class="form-group"><label>教師</label><select id="newAssignTeacher">${data.teachers.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}</select></div>
      <div class="form-group"><label>課程</label><select id="newAssignCourse" onchange="App.updateAssignSportOptions()">${data.courses.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}</select></div>
      <div class="form-group"><label>運動項目</label><select id="newAssignSport"></select></div>
      <div class="form-group"><label>班數</label><input type="number" id="newAssignCount" value="1" min="1"></div>
      <div class="modal-actions"><button class="btn" onclick="this.closest('.modal-overlay').remove()">取消</button>
      <button class="btn btn-primary" onclick="App.addAssignment()">新增</button></div></div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    updateAssignSportOptions();
  }

  function updateAssignSportOptions() {
    const cs = document.getElementById('newAssignCourse');
    const ss = document.getElementById('newAssignSport');
    if (!cs || !ss) return;
    const c = getCourse(cs.value);
    ss.innerHTML = (c ? c.allowedSports : []).map(s => `<option value="${s}">${s}</option>`).join('');
  }

  function addAssignment() {
    const tid = document.getElementById('newAssignTeacher').value;
    const cid = document.getElementById('newAssignCourse').value;
    const sport = document.getElementById('newAssignSport').value;
    const cc = parseInt(document.getElementById('newAssignCount').value) || 1;
    if (!sport) { alert('請選擇運動項目'); return; }
    if (cc < 1) { alert('班數必須大於 0'); return; }
    data.assignments.push({ teacherId: tid, courseId: cid, sport, classCount: cc });
    saveData(); document.querySelector('.modal-overlay')?.remove(); switchTab('assignments');
  }

  function updateAssignment(idx, field, value) {
    if (idx < 0 || idx >= data.assignments.length || isNaN(value) || value < 0) return;
    data.assignments[idx][field] = value; saveData();
  }

  function deleteAssignment(idx) {
    if (!confirm('確定要刪除此授課配置嗎？')) return;
    data.assignments.splice(idx, 1); saveData(); switchTab('assignments');
  }

  // ========== 自動排課演算法 (6時段版) ==========
  function autoSchedule() {
    if (!confirm('確定要依配置重新自動排課嗎？這會清除現有課表並重新安排。')) return;

    data.timetable = [];
    const unplaced = [];

    const sortedAssignments = [...data.assignments].sort((a, b) => {
      const ta = getTeacher(a.teacherId), tb = getTeacher(b.teacherId);
      return (ta ? ta.priority : 99) - (tb ? tb.priority : 99);
    });

    const occupancy = {};
    DAYS.forEach(d => {
      occupancy[d] = {};
      SLOTS.forEach(s => { occupancy[d][s] = { teacherIds: new Set(), venueIds: new Set() }; });
    });

    const teacherDailyCount = {};
    data.teachers.forEach(t => {
      teacherDailyCount[t.id] = {};
      DAYS.forEach(d => { teacherDailyCount[t.id][d] = 0; });
    });

    const classNumberCounters = {};
    data.courses.forEach(c => { classNumberCounters[c.id] = 1; });

    const classUnits = [];
    sortedAssignments.forEach(a => {
      for (let i = 0; i < a.classCount; i++) {
        classUnits.push({ teacherId: a.teacherId, courseId: a.courseId, sport: a.sport });
      }
    });

    for (const unit of classUnits) {
      const teacher = getTeacher(unit.teacherId);
      const course = getCourse(unit.courseId);
      if (!teacher || !course) { unplaced.push({ ...unit, reason: '教師或課程資料遺失' }); continue; }
      if (!teacher.skills.includes(unit.sport)) { unplaced.push({ ...unit, reason: `${teacher.name} 不具備 ${unit.sport} 技能` }); continue; }

      const suitableVenues = findVenuesForSport(unit.sport);
      if (suitableVenues.length === 0) { unplaced.push({ ...unit, reason: `沒有場地支援 ${unit.sport}` }); continue; }

      const availableSlots = [];
      DAYS.forEach(day => {
        SLOTS.forEach(slot => {
          // 星期五晚上(S5,S6)不排課
          if (day === 'FRI' && (slot === 'S5' || slot === 'S6')) return;
          if (teacherDailyCount[unit.teacherId][day] >= teacher.maxDailyClasses) return;
          if (occupancy[day][slot].teacherIds.has(unit.teacherId)) return;

          const freeVenues = suitableVenues.filter(v => !occupancy[day][slot].venueIds.has(v.id));
          if (freeVenues.length === 0) return;

          const pref = teacher.preferences.find(p => p.day === day && p.slot === slot);
          let prefScore = pref ? pref.order : 100;
          // 連續課堂加分
          if (slot === 'S2' && occupancy[day]['S1'].teacherIds.has(unit.teacherId)) prefScore -= 1;
          if (slot === 'S1' && occupancy[day]['S2'].teacherIds.has(unit.teacherId)) prefScore -= 1;
          if (slot === 'S4' && occupancy[day]['S3'].teacherIds.has(unit.teacherId)) prefScore -= 1;
          if (slot === 'S3' && occupancy[day]['S4'].teacherIds.has(unit.teacherId)) prefScore -= 1;

          availableSlots.push({ day, slot, prefScore, freeVenues });
        });
      });

      if (availableSlots.length === 0) { unplaced.push({ ...unit, reason: `無可用時段` }); continue; }
      availableSlots.sort((a, b) => a.prefScore - b.prefScore);

      let placed = false;
      for (const sc of availableSlots) {
        const chosenVenue = sc.freeVenues[0];
        if (occupancy[sc.day][sc.slot].venueIds.has(chosenVenue.id)) continue;

        const cn = classNumberCounters[unit.courseId]++;
        data.timetable.push({
          id: generateId(), day: sc.day, slot: sc.slot,
          courseId: unit.courseId, classNumber: cn,
          sport: unit.sport, teacherId: unit.teacherId, venueId: chosenVenue.id
        });
        occupancy[sc.day][sc.slot].teacherIds.add(unit.teacherId);
        occupancy[sc.day][sc.slot].venueIds.add(chosenVenue.id);
        teacherDailyCount[unit.teacherId][sc.day]++;
        placed = true;
        break;
      }
      if (!placed) unplaced.push({ ...unit, reason: '無法找到合適場地' });
    }

    saveData();
    let msg = `自動排課完成！\n✅ 已安排：${data.timetable.length} 堂\n`;
    if (unplaced.length > 0) {
      msg += `⚠️ 未排課堂：${unplaced.length} 堂\n\n未排課堂詳情：\n`;
      unplaced.forEach(u => {
        const t = getTeacher(u.teacherId), c = getCourse(u.courseId);
        msg += `• ${t?t.name:'?'} - ${c?c.name:u.courseId} - ${u.sport}：${u.reason}\n`;
      });
    }
    alert(msg);
    switchTab('timetable');
  }

  // ========== 課表檢視 (6時段版) ==========
  function renderTimetable(container) {
    const teachers = data.teachers;
    container.innerHTML = `
      <h2>📅 課表檢視</h2>
      <div class="timetable-controls">
        <button class="btn btn-primary" onclick="App.autoSchedule()">🔄 依配置重新自動排課</button>
        <button class="btn btn-danger btn-sm" onclick="App.clearTimetable()">🗑️ 清除課表</button>
        <span style="margin-left:auto;color:var(--text-secondary);font-size:0.85rem;">已排 <strong>${data.timetable.length}</strong> 堂</span>
      </div>
      <div class="card"><label>教師篩選</label>
        <div class="filter-chips">
          <span class="chip ${selectedTeacherFilter===null?'active':''}" onclick="App.setTeacherFilter(null)">全部教師</span>
          ${teachers.map(t => `<span class="chip ${selectedTeacherFilter===t.id?'active':''}" onclick="App.setTeacherFilter('${t.id}')"><span class="color-dot" style="background:${t.color}"></span>${t.name}</span>`).join('')}
        </div></div>
      <div class="card timetable-grid"><div class="table-wrap"><table>
        <thead><tr><th class="time-col">時間</th>${DAYS.map(d => `<th>${DAY_LABELS[d]}<br><small>${d}</small></th>`).join('')}</tr></thead>
        <tbody>${SLOTS.map(s => `<tr>
          <td class="time-col"><strong>${SLOT_SHORT[s]}</strong></td>
          ${DAYS.map(d => {
            const entries = data.timetable.filter(e => e.day === d && e.slot === s);
            const fe = selectedTeacherFilter ? entries.filter(e => e.teacherId === selectedTeacherFilter) : entries;
            const hc = entries.length - fe.length;
            return `<td class="slot-cell" data-day="${d}" data-slot="${s}"
              ondragover="App.handleDragOver(event)" ondragleave="App.handleDragLeave(event)" ondrop="App.handleDrop(event, '${d}', '${s}')">
              ${fe.map(e => renderClassCard(e)).join('')}
              ${hc > 0 ? `<div class="text-sm text-center" style="font-size:0.7rem;">+${hc} 堂已隱藏</div>` : ''}
              ${fe.length===0 && hc===0 ? '<div class="empty-state" style="padding:10px;font-size:0.7rem;">-</div>' : ''}</td>`;
          }).join('')}</tr>`).join('')}</tbody>
      </table></div></div>${renderUnplacedInfo()}`;
  }

  function renderClassCard(e) {
    const teacher = getTeacher(e.teacherId), course = getCourse(e.courseId), venue = getVenue(e.venueId);
    return `<div class="class-card" draggable="true" style="border-left-color:${teacher?teacher.color:'#ccc'}" data-entry-id="${e.id}"
      ondragstart="App.handleDragStart(event, '${e.id}')" ondragend="App.handleDragEnd(event)">
      <span class="delete-class" onclick="event.stopPropagation();App.deleteTimetableEntry('${e.id}')">✕</span>
      <div class="cc-sport">${e.sport}</div><div class="cc-teacher">${teacher?teacher.name:'?'}</div>
      <div style="font-size:0.65rem;">${course?course.name:e.courseId} #${e.classNumber}</div>
      <div class="cc-venue" style="font-size:0.65rem;">📍 ${venue?venue.name:e.venueId}</div></div>`;
  }

  function renderUnplacedInfo() {
    const unplaced = [];
    data.assignments.forEach(a => {
      const sched = data.timetable.filter(e => e.teacherId === a.teacherId && e.courseId === a.courseId && e.sport === a.sport).length;
      if (sched < a.classCount) unplaced.push({ ...a, remaining: a.classCount - sched });
    });
    if (unplaced.length === 0) return '';
    return `<div class="alert alert-warning mt-2"><strong>⚠️ 未排課堂：</strong>${unplaced.map(u => {
      const t = getTeacher(u.teacherId), c = getCourse(u.courseId);
      return `<div>• ${t?t.name:'?'} - ${c?c.name:u.courseId} - ${u.sport}：尚欠 ${u.remaining} 班</div>`;
    }).join('')}</div>`;
  }

  function setTeacherFilter(tid) { selectedTeacherFilter = tid; switchTab('timetable'); }
  function clearTimetable() { if (!confirm('確定要清除所有課表嗎？')) return; data.timetable = []; saveData(); switchTab('timetable'); }
  function deleteTimetableEntry(id) { if (!confirm('確定要刪除此課堂嗎？')) return; data.timetable = data.timetable.filter(e => e.id !== id); saveData(); switchTab('timetable'); }

  // ========== 拖曳功能 ==========
  let dragEntryId = null;
  function handleDragStart(event, entryId) { dragEntryId = entryId; event.target.classList.add('dragging'); event.dataTransfer.effectAllowed = 'move'; event.dataTransfer.setData('text/plain', entryId); }
  function handleDragEnd(event) { event.target.classList.remove('dragging'); document.querySelectorAll('.slot-cell.drag-over').forEach(c => c.classList.remove('drag-over')); dragEntryId = null; }
  function handleDragOver(event) { event.preventDefault(); event.dataTransfer.dropEffect = 'move'; event.currentTarget.classList.add('drag-over'); }
  function handleDragLeave(event) { event.currentTarget.classList.remove('drag-over'); }

  function handleDrop(event, targetDay, targetSlot) {
    event.preventDefault(); event.currentTarget.classList.remove('drag-over');
    const entryId = dragEntryId || event.dataTransfer.getData('text/plain');
    if (!entryId) return;
    const entry = data.timetable.find(e => e.id === entryId);
    if (!entry) return;

    // 星期五晚上(S5,S6)不可排課
    if (targetDay === 'FRI' && (targetSlot === 'S5' || targetSlot === 'S6')) {
      alert('⚠️ 星期五晚上不排課 (17:30 後)'); return;
    }

    // 教師撞堂
    const tc = data.timetable.find(e => e.id !== entryId && e.day === targetDay && e.slot === targetSlot && e.teacherId === entry.teacherId);
    if (tc) { alert(`⚠️ 教師衝突：${getTeacher(entry.teacherId)?.name||'?'} 在該時段已有課堂`); return; }

    // 每日上限
    const teacher = getTeacher(entry.teacherId);
    if (teacher && entry.day !== targetDay) {
      const cnt = data.timetable.filter(e => e.id !== entryId && e.teacherId === entry.teacherId && e.day === targetDay).length;
      if (cnt >= teacher.maxDailyClasses) { alert(`⚠️ ${teacher.name} 在 ${DAY_LABELS[targetDay]} 已達上限 (${teacher.maxDailyClasses})`); return; }
    }

    // 場地檢查
    const origFree = !data.timetable.find(e => e.id !== entryId && e.day === targetDay && e.slot === targetSlot && e.venueId === entry.venueId);
    if (!origFree) {
      const sv = findVenuesForSport(entry.sport);
      const alt = sv.find(v => !data.timetable.find(e => e.id !== entryId && e.day === targetDay && e.slot === targetSlot && e.venueId === v.id));
      if (alt) { entry.venueId = alt.id; }
      else { alert('⚠️ 所有適合場地在此時段已被使用'); return; }
    }

    entry.day = targetDay; entry.slot = targetSlot;
    saveData(); switchTab('timetable');
  }

  // ========== Excel 匯出 (6時段版) ==========
  function renderExport(container) {
    container.innerHTML = `<h2>📥 匯出 Excel</h2>
      <div class="card"><h3>匯出選項</h3><p class="text-sm mb-2">課表：<strong>${data.timetable.length}</strong> 堂</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-success" onclick="App.exportTimetableExcel()">📅 彩色總課表</button>
        <button class="btn btn-primary" onclick="App.exportTeachersExcel()">👨‍🏫 教師列表</button>
        <button class="btn btn-primary" onclick="App.exportVenuesExcel()">🏟️ 場地列表</button>
        <button class="btn btn-primary" onclick="App.exportTeacherListsExcel()">📋 教師課表</button></div></div>`;
  }

  function generateXLSX(sheets) {
    let html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">';
    html += '<head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>';
    sheets.forEach(s => { html += `<x:ExcelWorksheet><x:Name>${s.name}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>`; });
    html += '</x:ExcelWorksheets></xml><![endif]--></head><body>';
    sheets.forEach(s => { html += `<h2>${s.name}</h2>${s.html}<br><br>`; });
    html += '</body></html>'; return html;
  }

  function downloadExcel(html, filename) {
    const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename; a.click();
  }

  function exportTimetableExcel() {
    let th = '<table border="1" cellpadding="4"><tr><th>時間</th>';
    DAYS.forEach(d => { th += `<th>${DAY_LABELS[d]}<br>${d}</th>`; });
    th += '</tr>';
    SLOTS.forEach(s => {
      th += '<tr><td><strong>' + SLOT_SHORT[s] + '</strong><br>' + SLOT_TIME[s] + '</td>';
      DAYS.forEach(d => {
        const entries = data.timetable.filter(e => e.day === d && e.slot === s);
        if (entries.length === 0) { th += '<td></td>'; }
        else {
          th += '<td>';
          entries.forEach(e => {
            const t = getTeacher(e.teacherId), c = getCourse(e.courseId), v = getVenue(e.venueId);
            th += `<div style="background:${t?t.color:'#fff'}22;border-left:3px solid ${t?t.color:'#ccc'};padding:3px;margin:1px 0;">`;
            th += `<strong>${e.sport}</strong><br>${t?t.name:'?'}<br>${c?c.name:e.courseId} #${e.classNumber}<br>📍${v?v.name:e.venueId}</div>`;
          });
          th += '</td>';
        }
      });
      th += '</tr>';
    });
    th += '</table>';
    downloadExcel(generateXLSX([{ name: 'Timetable', html: th }]), `FED_Timetable_${new Date().toISOString().slice(0,10)}.xls`);
  }

  function exportTeachersExcel() {
    let th = '<table border="1" cellpadding="4"><tr><th>姓名</th><th>優先</th><th>上限</th><th>技能</th><th>偏好</th><th>配置</th></tr>';
    data.teachers.forEach(t => {
      const asgn = data.assignments.filter(a => a.teacherId === t.id);
      th += `<tr><td style="background:${t.color}33">${t.name}</td><td>${t.priority}</td><td>${t.maxDailyClasses}</td>`;
      th += `<td>${t.skills.join(', ')}</td>`;
      th += `<td>${[...t.preferences].sort((a,b)=>a.order-b.order).map(p => `#${p.order} ${DAY_LABELS[p.day]}｜${SLOT_SHORT[p.slot]}`).join('<br>')}</td>`;
      th += `<td>${asgn.map(a => { const c=getCourse(a.courseId); return `${c?c.name:a.courseId}｜${a.sport}｜${a.classCount}班`; }).join('<br>')}</td></tr>`;
    });
    th += '</table>';
    downloadExcel(generateXLSX([{ name: 'Teachers', html: th }]), `FED_Teachers_${new Date().toISOString().slice(0,10)}.xls`);
  }

  function exportVenuesExcel() {
    let th = '<table border="1" cellpadding="4"><tr><th>場地</th><th>可進行項目</th></tr>';
    data.venues.forEach(v => { th += `<tr><td><strong>${v.name}</strong></td><td>${v.allowedSports.join(', ')}</td></tr>`; });
    th += '</table>';
    downloadExcel(generateXLSX([{ name: 'Venues', html: th }]), `FED_Venues_${new Date().toISOString().slice(0,10)}.xls`);
  }

  function exportTeacherListsExcel() {
    let et = {};
    data.timetable.forEach(e => { if (!et[e.teacherId]) et[e.teacherId] = []; et[e.teacherId].push(e); });
    let th = '<table border="1" cellpadding="4"><tr><th>教師</th><th>星期</th><th>時間</th><th>項目</th><th>課程</th><th>班號</th><th>場地</th></tr>';
    DAYS.forEach(d => SLOTS.forEach(s => {
      Object.keys(et).forEach(tid => {
        (et[tid]||[]).filter(e => e.day===d && e.slot===s).forEach(e => {
          const t = getTeacher(e.teacherId), c = getCourse(e.courseId), v = getVenue(e.venueId);
          th += `<tr><td style="background:${t?t.color:'#fff'}33">${t?t.name:'?'}</td><td>${DAY_LABELS[d]}</td><td>${SLOT_TIME[s]}</td>`;
          th += `<td>${e.sport}</td><td>${c?c.name:e.courseId}</td><td>#${e.classNumber}</td><td>${v?v.name:e.venueId}</td></tr>`;
        });
      });
    }));
    th += '</table>';
    downloadExcel(generateXLSX([{ name: 'Teacher Lists', html: th }]), `FED_TeacherLists_${new Date().toISOString().slice(0,10)}.xls`);
  }

  // ========== 公開 API ==========
  return {
    init, switchTab, resetData, exportJSON, importJSON,
    showAddCourseModal, addCourse, updateCourse, showEditCourseSports, saveCourseSports, deleteCourse,
    showAddTeacherModal, addTeacher, showEditTeacherModal, saveEditTeacher, updateTeacher, deleteTeacher,
    removeTeacherSkill, showAddSkillModal, addTeacherSkill,
    removeTeacherPref, showAddPrefModal, addTeacherPref, moveTeacherPref,
    showAddVenueModal, addVenue, showEditVenueSports, saveVenueSports, deleteVenue,
    showAddAssignmentModal, updateAssignSportOptions, addAssignment, updateAssignment, deleteAssignment,
    autoSchedule, clearTimetable, deleteTimetableEntry,
    setTeacherFilter,
    handleDragStart, handleDragEnd, handleDragOver, handleDragLeave, handleDrop,
    exportTimetableExcel, exportTeachersExcel, exportVenuesExcel, exportTeacherListsExcel
  };
})();

document.addEventListener('DOMContentLoaded', () => App.init());
