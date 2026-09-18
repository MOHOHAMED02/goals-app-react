import { useContext } from 'react';
import { GoalsContext } from './GoalsContext.js';

export default function Dashboard() {
  const { goals } = useContext(GoalsContext);

  let totalTasks = 0;
  let completedTasks = 0;

  for (let i = 0; i < goals.length; i++) {
    let tasks = goals[i].tasks;
    totalTasks = totalTasks + tasks.length;
    completedTasks =
      completedTasks + tasks.filter((task) => task.status === 'COMPLETED').length;
  }

  let percent = 0;
  if (totalTasks > 0) {
    percent = Math.round((completedTasks / totalTasks) * 100);
  }

  return (
    <div className="dashboard">
      <div className="stat">
        <h2>סה"כ יעדים</h2>
        <span className="stat-value">{goals.length}</span>
      </div>

      <div className="stat">
        <h2>אחוז השלמת משימות</h2>
        <span className="stat-value">{percent}%</span>
      </div>
    </div>
  );
}
