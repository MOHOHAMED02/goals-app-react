import { useState, useContext } from 'react';
import { GoalsContext } from './GoalsContext.js';

let nextTaskId = 5000;

export default function AddTaskForm({ goalId }) {
  const { dispatch } = useContext(GoalsContext);
  const [description, setDescription] = useState('');

  function handleAdd() {
    if (description.trim() === '') {
      return;
    }

    dispatch({
      type: 'task_added',
      goalId: goalId,
      taskId: nextTaskId++,
      description: description,
    });

    setDescription('');
  }

  return (
    <div className="add-task-form">
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="משימה חדשה..."
      />
      <button className="btn-add-task" onClick={handleAdd}>
        הוסף משימה
      </button>
    </div>
  );
}
