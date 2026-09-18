import { useContext } from 'react';
import { GoalsContext } from './GoalsContext.js';

export default function TaskRow({ goalId, task }) {
  const { dispatch } = useContext(GoalsContext);

  function handleStatusChange(e) {
    dispatch({
      type: 'task_status_changed',
      goalId: goalId,
      taskId: task.id,
      status: e.target.value,
    });
  }

  let statusClass = 'status-pending';
  if (task.status === 'IN PROGRESS') {
    statusClass = 'status-progress';
  } else if (task.status === 'COMPLETED') {
    statusClass = 'status-completed';
  }

  return (
    <li className="task-row">
      <span className={task.status === 'COMPLETED' ? 'task-text done' : 'task-text'}>
        {task.description}
      </span>

      <select value={task.status} onChange={handleStatusChange} className={statusClass}>
        <option value="PENDING">PENDING - טרם החל</option>
        <option value="IN PROGRESS">IN PROGRESS - בטיפול</option>
        <option value="COMPLETED">COMPLETED - הושלם</option>
      </select>
    </li>
  );
}