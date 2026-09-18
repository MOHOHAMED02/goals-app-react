import { useContext } from 'react';
import { GoalsContext } from './GoalsContext.js';
import TaskRow from './TaskRow.js';
import AddTaskForm from './AddTaskForm.js';

export default function GoalCard({ goal }) {
  const { dispatch } = useContext(GoalsContext);

  const total = goal.tasks.length;
  const done = goal.tasks.filter((task) => task.status === 'COMPLETED').length;

  let percent = 0;
  if (total > 0) {
    percent = Math.round((done / total) * 100);
  }

  let cardClass = 'card goal-card';
  if (total > 0 && done === total) {
    cardClass = 'card goal-card all-done';
  } else if (done > 0) {
    cardClass = 'card goal-card started';
  }

  function handleDeleteGoal() {
    dispatch({
      type: 'goal_deleted',
      id: goal.id,
    });
  }

  return (
    <div className={cardClass}>
      <div className="goal-header">
        <div className="goal-title-area">
          <h3>{goal.title}</h3>
          <span className="quarter-badge">{goal.quarter}</span>
        </div>

        <button className="btn-delete-goal" onClick={handleDeleteGoal}>
          מחק יעד
        </button>
      </div>

      {total === 0 ? (
        <p className="empty-note">אין עדיין משימות ליעד זה.</p>
      ) : (
        <>
          <div className="goal-progress">
            <div className="progress-track">
              <div
                className={done === total ? 'progress-fill complete' : 'progress-fill'}
                style={{ width: percent + '%' }}
              />
            </div>
            <span className="progress-count">
              {done} מתוך {total} הושלמו
            </span>
          </div>

          <ul className="task-list">
            {goal.tasks.map((task) => (
              <TaskRow key={task.id} goalId={goal.id} task={task} />
            ))}
          </ul>
        </>
      )}

      <AddTaskForm goalId={goal.id} />
    </div>
  );
}