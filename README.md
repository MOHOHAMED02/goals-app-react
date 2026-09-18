# OKR Goals Manager

A quarterly objectives tracker built with React. Create goals, break them into tasks, move each task through its lifecycle, and watch completion percentages update automatically.

Built as a final project for a React course.

![App screenshot](screenshot.png)

---

## What it does

- **Create goals** — each with a title and a quarter (Q1–Q4)
- **Add tasks** to any goal; every new task starts as `PENDING`
- **Track status** — `PENDING` → `IN PROGRESS` → `COMPLETED`, with completed tasks struck through
- **See progress** — a per-goal progress bar plus an overall completion percentage across every task
- **Delete goals** when they are no longer relevant

---

## Running locally

```bash
npm install
npm start
```

Opens at `http://localhost:3000`.

---

## Architecture

All application data lives in a single `useReducer` at the root. No component holds a copy, and no component mutates data directly — every change is dispatched as an action and applied by the reducer.

```
App                      useReducer + Context Provider
├── Dashboard            reads goals
├── AddGoalForm          dispatches goal_added
└── GoalList             reads goals, maps over them
    └── GoalCard         dispatches goal_deleted
        ├── TaskRow      dispatches task_status_changed
        └── AddTaskForm  dispatches task_added
```

### Reducer actions

| Action | Effect | Payload |
|---|---|---|
| `goal_added` | Adds a goal with an empty task list | `id`, `title`, `quarter` |
| `goal_deleted` | Removes a goal | `id` |
| `task_added` | Adds a task with status `PENDING` | `goalId`, `taskId`, `description` |
| `task_status_changed` | Updates a task's status | `goalId`, `taskId`, `status` |

An unknown action type throws rather than silently returning `undefined`, so typos surface immediately.

---

## Implementation notes

**Context over prop drilling.** `TaskRow` sits three levels below `App`. Without context, `GoalList` and `GoalCard` would have to forward `dispatch` without ever using it. A single context carries both `goals` and `dispatch` to whichever component needs them.

**Immutable updates throughout.** React compares references, not contents — mutating an array in place leaves the reference unchanged and the UI never re-renders. Every reducer branch builds new objects and arrays. The deepest case, `task_status_changed`, creates four: a new goals array, a new goal object, a new tasks array, and a new task object.

**One state object per form.** `AddGoalForm` has two inputs but a single `useState` and a single change handler, keyed by the input's `name` attribute:

```javascript
function handleChange(e) {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });
}
```

The computed property name `[name]` resolves at runtime, so one handler serves every field.

**No duplicated state.** `TaskRow` reads `task.status` directly instead of mirroring it into local state. A second copy would drift out of sync the moment the reducer updated the original.

---

## Built with

React 18 · `useReducer` · Context API · plain CSS

No external state management or UI libraries.

---

## Project structure

```
src/
├── App.js             useReducer, Provider, page layout
├── GoalsContext.js    createContext
├── goalsReducer.js    all state transitions
├── Dashboard.js       overall completion stats
├── AddGoalForm.js     goal creation form
├── GoalList.js        maps goals to cards
├── GoalCard.js        single goal + its tasks
├── TaskRow.js         task description + status select
├── AddTaskForm.js     task creation form
└── index.css          styling
```