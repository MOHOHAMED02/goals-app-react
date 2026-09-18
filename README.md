# ניהול יעדי ביצוע לפי רבעונים

פרויקט סיום React — סמסטר קיץ תשפ"ו

## הרצה

```
npm install
npm start
```

האפליקציה תיפתח בכתובת http://localhost:3000

## מבנה הקומפוננטות

```
App
└── GoalsProvider          ← useReducer + שני Provider
    ├── Dashboard          ← אחוז השלמה + מספר יעדים
    ├── AddGoalForm        ← סטייט אחד עם שדות דינמיים
    └── GoalList
        └── GoalCard
            ├── TaskRow    ← תיאור + רשימת סטטוס
            └── AddTaskForm
```

## קבצים

| קובץ | תפקיד |
|---|---|
| `constants.js` | קבועי סטטוס ורבעונים |
| `goalsReducer.js` | כל שינויי המצב, ללא מוטציה |
| `GoalsContext.js` | שני קונטקסטים: נתונים ו-dispatch |
| `GoalsProvider.js` | מחבר את הרדיוסר לקונטקסטים |

## הערות

- הנתונים ו-`dispatch` מועברים דרך Context בלבד, ללא גלגול פרופסים.
- `AddGoalForm` מנוהל בסטייט אחד עם מטפל אירוע אחד המשתמש בשם השדה הדינמי.
- כל שינוי במערך או באובייקט יוצר עותק חדש.
