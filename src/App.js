import { useReducer } from 'react';
import { GoalsContext } from './GoalsContext.js';
import goalsReducer from './goalsReducer.js';
import Dashboard from './Dashboard.js';
import AddGoalForm from './AddGoalForm.js';
import GoalList from './GoalList.js';

const initialGoals = [
  {
    id: 1,
    title: 'שדרוג מהירות האתר ב-40%',
    quarter: 'Q1',
    tasks: [
      { id: 101, description: 'אופטימיזציה לתמונות (WebP)', status: 'COMPLETED' },
      { id: 102, description: 'הטמעת Lazy Loading', status: 'IN PROGRESS' },
    ],
  },
];

export default function App() {
  const [goals, dispatch] = useReducer(goalsReducer, initialGoals);

  return (
    <GoalsContext.Provider value={{ goals: goals, dispatch: dispatch }}>
      <div className="page">
        <h1>OKRs - מערכת ניהול משימות ורבעונים</h1>
        <Dashboard />
        <AddGoalForm />
        <GoalList />
      </div>
    </GoalsContext.Provider>
  );
}
