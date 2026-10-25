import React from 'react'

const ProgressBar = ({ tasks }) => {
    if (!tasks || tasks.length === 0) {
        return null
    }
    
    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length
    
    const totalTasks = tasks.length
    const progress = (completedTasks / totalTasks) * 100
    
    return (
        <div>
      <p>
        {completedTasks} / {totalTasks} completed
      </p>

      <div>
        <div
          style={{
              width: `${progress}%`,
              height: '8px',
              backgroundColor: '#4caf50',
              borderRadius: '4px',
            }}
            />
      </div>
    </div>
  )
}

export default ProgressBar