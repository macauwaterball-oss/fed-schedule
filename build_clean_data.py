import json

# Correct teacher data from Excel analysis
# Mapping from Excel staff column names to display names
TEACHERS = [
    {"name": "Walter", "skills": ["Kinball", "Rock Climbing"], "cped1": 2, "cped2": 4,
     "cped1_sport": "Kinball", "cped2_sport": "Rock Climbing"},
    {"name": "Water", "skills": ["Pickle Ball"], "cped1": 0, "cped2": 6,
     "cped1_sport": "", "cped2_sport": "Pickle Ball"},
    {"name": "Frankie", "skills": ["Volleyball"], "cped1": 8, "cped2": 0,
     "cped1_sport": "Volleyball", "cped2_sport": ""},
    {"name": "Gasper", "skills": ["Tchoukball", "Table Tennis"], "cped1": 2, "cped2": 5,
     "cped1_sport": "Tchoukball", "cped2_sport": "Table Tennis"},
    {"name": "Leong Hung Po", "skills": ["Basketball"], "cped1": 4, "cped2": 0,
     "cped1_sport": "Basketball", "cped2_sport": ""},
    {"name": "Chow Kin Tung", "skills": ["Handball"], "cped1": 4, "cped2": 0,
     "cped1_sport": "Handball", "cped2_sport": ""},
    {"name": "Ip Kuai Wa", "skills": ["Volleyball"], "cped1": 4, "cped2": 0,
     "cped1_sport": "Volleyball", "cped2_sport": ""},
    {"name": "Chan Hoi Hung", "skills": ["Basketball"], "cped1": 5, "cped2": 0,
     "cped1_sport": "Basketball", "cped2_sport": ""},
    {"name": "Xi Chengqing", "skills": ["Martial Arts"], "cped1": 0, "cped2": 4,
     "cped1_sport": "", "cped2_sport": "Martial Arts"},
    {"name": "Sou Hing Tai", "skills": ["Golf"], "cped1": 0, "cped2": 4,
     "cped1_sport": "", "cped2_sport": "Golf"},
    {"name": "Ma Yin Hung", "skills": ["Yoga"], "cped1": 0, "cped2": 5,
     "cped1_sport": "", "cped2_sport": "Yoga"},
    {"name": "Lo Pui Shan", "skills": ["Yoga"], "cped1": 0, "cped2": 5,
     "cped1_sport": "", "cped2_sport": "Yoga"},
    {"name": "Lai Weng Fat", "skills": ["Basketball"], "cped1": 5, "cped2": 0,
     "cped1_sport": "Basketball", "cped2_sport": ""},
    {"name": "Dr. Zhang Di", "skills": ["Soccer"], "cped1": 5, "cped2": 0,
     "cped1_sport": "Soccer", "cped2_sport": ""},
    {"name": "Leong Wai Man", "skills": ["Martial Arts"], "cped1": 0, "cped2": 4,
     "cped1_sport": "", "cped2_sport": "Martial Arts"},
    {"name": "Ka Chon LAM", "skills": ["Diabolo"], "cped1": 0, "cped2": 4,
     "cped1_sport": "", "cped2_sport": "Diabolo"},
]

COLORS = ['#3b82f6','#ef4444','#22c55e','#f59e0b','#8b5cf6','#ec4899','#14b8a6','#f97316',
          '#6366f1','#84cc16','#06b6d4','#d946ef','#e11d48','#0ea5e9','#a855f7','#10b981']

# Generate teachers array
teachers_js = []
for idx, t in enumerate(TEACHERS):
    teacher = {
        'id': f't{idx+1}',
        'name': t['name'],
        'color': COLORS[idx % len(COLORS)],
        'priority': idx + 1,
        'maxDailyClasses': 4,
        'skills': t['skills'],
        'preferences': []
    }
    teachers_js.append(teacher)

# Generate assignments
assignments_js = []
for t_idx, t in enumerate(TEACHERS):
    tid = f't{t_idx+1}'
    if t['cped1'] > 0 and t['cped1_sport']:
        assignments_js.append({
            'teacherId': tid,
            'courseId': 'CPED1001',
            'sport': t['cped1_sport'],
            'classCount': t['cped1']
        })
    if t['cped2'] > 0 and t['cped2_sport']:
        assignments_js.append({
            'teacherId': tid,
            'courseId': 'CPED1002',
            'sport': t['cped2_sport'],
            'classCount': t['cped2']
        })

# Venues
venues_js = [
    {'id': 'v_g001', 'name': 'G001', 'allowedSports': ['Handball','Baseball','Football','Soccer','Kinball','Volleyball']},
    {'id': 'v_g016', 'name': 'G016', 'allowedSports': ['Basketball','Volleyball','Korfball','Skipping Rope','Pickle Ball','Kinball','Golf','Diabolo','Tchoukball']},
    {'id': 'v_g028', 'name': 'G028', 'allowedSports': ['Basketball','Volleyball','Korfball','Skipping Rope','Pickle Ball','Kinball','Golf','Diabolo','Tchoukball']},
    {'id': 'v_badminton_hall', 'name': 'Badminton Hall', 'allowedSports': ['Badminton','Pickle Ball']},
    {'id': 'v_dance_room', 'name': 'Dance Room 3008', 'allowedSports': ['Dance','Yoga','Martial Arts']},
    {'id': 'v_table_tennis', 'name': 'Table Tennis Room 3010', 'allowedSports': ['Table Tennis']},
    {'id': 'v_climbing_wall', 'name': 'Rock Climbing Wall', 'allowedSports': ['Rock Climbing']},
]

# Courses
courses_js = [
    {'id': 'CPED1001', 'name': 'CPED1001', 'studentCount': 1365, 'capacityPerClass': 35,
     'allowedSports': ['Basketball','Football','Volleyball','Kinball','Handball','Baseball','Soccer','Korfball','Skipping Rope','Tchoukball']},
    {'id': 'CPED1002', 'name': 'CPED1002', 'studentCount': 1435, 'capacityPerClass': 35,
     'allowedSports': ['Badminton','Pickle Ball','Yoga','Martial Arts','Table Tennis','Rock Climbing','Golf','Diabolo','Dance']}
]

# Read timetable from extracted data
extracted = json.load(open('extracted_default_data.json', 'r', encoding='utf-8'))

# Build teacher name-to-id mapping
name_to_id = {}
for t in teachers_js:
    name_to_id[t['name'].lower()] = t['id']

# Also map extracted teacher names (which may have Chinese chars)
extracted_teachers = extracted.get('teachers', [])
for et in extracted_teachers:
    ename = et.get('name', '').lower()
    if ename not in name_to_id:
        # Try to find by skills
        for tjs in teachers_js:
            if set(et.get('skills', [])) & set(tjs['skills']):
                name_to_id[ename] = tjs['id']
                break

# Build venue name-to-id mapping
venue_name_to_id = {
    'g001': 'v_g001', 'g016': 'v_g016', 'g028': 'v_g028',
    'badminton hall': 'v_badminton_hall',
    'dance room 3008': 'v_dance_room', 'dance room': 'v_dance_room',
    'table tennis room 3010': 'v_table_tennis', 'table tennis room': 'v_table_tennis',
    'rock climbing wall': 'v_climbing_wall', 'climbing wall': 'v_climbing_wall',
}

def find_venue_id(name):
    if not name:
        return 'v_g001'
    name_lower = name.strip().rstrip('\xa0').lower()
    for k, v in venue_name_to_id.items():
        if k in name_lower:
            return v
    return 'v_g001'

# Parse timetable entries from the Excel-extracted data
# We need to re-parse the timetable from scratch since the earlier extraction had issues
import openpyxl
import re

wb = openpyxl.load_workbook('FED schedule 2026.08-11(1).xlsx', data_only=True)
ws = wb['PE Timetable']

TIME_SLOTS = [
    {'id': 'S1', 'time': '09:30~11:15'},
    {'id': 'S2', 'time': '11:30~13:15'},
    {'id': 'S3', 'time': '13:30~15:15'},
    {'id': 'S4', 'time': '15:30~17:15'},
    {'id': 'S5', 'time': '17:30~19:15'},
    {'id': 'S6', 'time': '19:30~21:15'},
]
DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI']
SLOT_ROWS = [(2,8),(8,14),(14,19),(19,23),(23,25),(25,28)]

# Mapping from timetable teacher names to our teacher IDs
# These are the names as they appear in the timetable cells
tt_name_to_id = {
    'walter': 't1', 'water': 't2', 'frankie': 't3', 'gasper': 't4',
    'leong hung po': 't5', 'ip kuai wa': 't7',
    'xi chengqing': 't9', 'lai weng fat': 't13',
    'dr. zhang di': 't14', 'leong wai man': 't15', 'ka chon lam': 't16',
}

def parse_cell(text):
    if not text or not str(text).strip():
        return []
    results = []
    lines = str(text).strip().split('\n')
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if not line:
            i += 1; continue
        m = re.match(r'^(.+?)\s*[-–]\s*(.+?)(?:\s*\(.*)?$', line)
        if not m:
            i += 1; continue
        sport = m.group(1).strip()
        teacher_raw = m.group(2).strip()
        entry = {'sport': sport, 'teacherRaw': teacher_raw}
        
        if i + 1 < len(lines):
            l2 = lines[i+1].strip()
            m2 = re.match(r'(CPED\s*\d+)\s*[-–]\s*(\d+)', l2)
            if m2:
                entry['courseId'] = m2.group(1).replace(' ', '')
                entry['section'] = m2.group(2)
                i += 1
        if i + 1 < len(lines):
            l3 = lines[i+1].strip()
            if not re.match(r'^.+?\s*[-–]\s*.+', l3) and not re.match(r'CPED', l3):
                entry['venue'] = l3.split('/')[0].strip()
                i += 1
        if 'sport' in entry and 'courseId' in entry:
            results.append(entry)
        i += 1
    return results

timetable_js = []
entry_id = 0

for slot_idx, (sr, er) in enumerate(SLOT_ROWS):
    slot_id = TIME_SLOTS[slot_idx]['id']
    for day_idx, day in enumerate(DAYS):
        col = day_idx + 1
        all_text = []
        for row in range(sr, er):
            val = ws.cell(row=row, column=col + 1).value
            if val and str(val).strip():
                all_text.append(str(val).strip())
        if all_text:
            entries = parse_cell('\n'.join(all_text))
            for e in entries:
                entry_id += 1
                tn = e['teacherRaw'].lower().strip()
                tid = None
                for k, v in tt_name_to_id.items():
                    if k in tn or tn in k:
                        tid = v
                        break
                if not tid:
                    # Try matching by sport
                    sport = e.get('sport', '').lower()
                    for tjs in teachers_js:
                        if sport in [s.lower() for s in tjs['skills']]:
                            tid = tjs['id']
                            break
                if not tid:
                    continue
                
                section = e.get('section', '0')
                try:
                    class_num = int(section)
                except:
                    class_num = entry_id
                
                vid = find_venue_id(e.get('venue', ''))
                
                timetable_js.append({
                    'id': f'tt_{entry_id}',
                    'day': day,
                    'slot': slot_id,
                    'courseId': e.get('courseId', 'CPED1001'),
                    'classNumber': class_num,
                    'sport': e.get('sport', ''),
                    'teacherId': tid,
                    'venueId': vid,
                })

print(f"Generated {len(timetable_js)} timetable entries")

# Build complete default data
default_data = {
    'courses': courses_js,
    'teachers': teachers_js,
    'venues': venues_js,
    'assignments': assignments_js,
    'timetable': timetable_js,
}

with open('clean_default_data.json', 'w', encoding='utf-8') as f:
    json.dump(default_data, f, ensure_ascii=False, indent=2)

print(f"Teachers: {len(teachers_js)}")
print(f"Assignments: {len(assignments_js)}")
print(f"CPED1001 total: {sum(a['classCount'] for a in assignments_js if a['courseId']=='CPED1001')}")
print(f"CPED1002 total: {sum(a['classCount'] for a in assignments_js if a['courseId']=='CPED1002')}")
print("\nDone! Saved to clean_default_data.json")
