import { useContext } from 'react';
import { GoalsContext } from './GoalsContext.js';
import GoalCard from './GoalCard.js';

export default function GoalList() {
  const { goals } = useContext(GoalsContext);

  if (goals.length === 0) {
    return <p className="empty-note center">אין יעדים להצגה. הוסף יעד חדש.</p>;
  }

  return (
    <div className="goal-list">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
}
