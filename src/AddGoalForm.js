import { useState, useContext } from 'react';
import { GoalsContext } from './GoalsContext.js';

let nextGoalId = 1000;

export default function AddGoalForm() {
  const { dispatch } = useContext(GoalsContext);

  const [form, setForm] = useState({
    title: '',
    quarter: 'Q1',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleAdd() {
    if (form.title.trim() === '') {
      return;
    }

    dispatch({
      type: 'goal_added',
      id: nextGoalId++,
      title: form.title,
      quarter: form.quarter,
    });

    setForm({ title: '', quarter: 'Q1' });
  }

  return (
    <div className="card">
      <h2>הוספת יעד רבעוני חדש</h2>

      <label className="field">
        <span className="field-label">שם היעד:</span>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="למשל: פיתוח פיצ'ר צ'אט"
        />
      </label>

      <label className="field">
        <span className="field-label">רבעון:</span>
        <select name="quarter" value={form.quarter} onChange={handleChange}>
          <option value="Q1">Q1</option>
          <option value="Q2">Q2</option>
          <option value="Q3">Q3</option>
          <option value="Q4">Q4</option>
        </select>
      </label>

      <button className="btn-create" onClick={handleAdd}>
        צור יעד חדש
      </button>
    </div>
  );
}
