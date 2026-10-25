import React from 'react'
import { useState } from 'react'

const Checklist = ({ tasks, onTasksChange }) => {
  const handleToggle = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index
        ? { ...task, completed: !task.completed }
        : task
    )

    onTasksChange(updatedTasks)
  }

  if (!tasks || tasks.length === 0) {
    return null
  }

  return (
    <div>
      <h3>Checklist</h3>

      {tasks.map((task, index) => (
        <label key={index} style={{ display: 'block' }}>
          <input
            type="checkbox"
            checked={Boolean(task.completed)}
            onChange={() => handleToggle(index)}
          />

          <span
            style={{
              textDecoration: task.completed
                ? 'line-through'
                : 'none',
            }}
          >
            {task.text}
          </span>
        </label>
      ))}
    </div>
  )
}

export default Checklist