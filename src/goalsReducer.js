export default function goalsReducer(goals, action) {
  switch (action.type) {
    case 'goal_added': {
      return [
        ...goals,
        {
          id: action.id,
          title: action.title,
          quarter: action.quarter,
          tasks: [],
        },
      ];
    }

    case 'goal_deleted': {
      return goals.filter((goal) => goal.id !== action.id);
    }

    case 'task_added': {
      return goals.map((goal) => {
        if (goal.id !== action.goalId) {
          return goal;
        }
        return {
          ...goal,
          tasks: [
            ...goal.tasks,
            {
              id: action.taskId,
              description: action.description,
              status: 'PENDING',
            },
          ],
        };
      });
    }

    case 'task_status_changed': {
      return goals.map((goal) => {
        if (goal.id !== action.goalId) {
          return goal;
        }
        return {
          ...goal,
          tasks: goal.tasks.map((task) => {
            if (task.id !== action.taskId) {
              return task;
            }
            return { ...task, status: action.status };
          }),
        };
      });
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
