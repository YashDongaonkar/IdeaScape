
import { useState } from 'react'

const IdeaForm = ({ initialData, onSubmit, isLoading = false }) => {
  const [title, setTitle] = useState(initialData?.title || '')
  const [description, setDescription] = useState(
    initialData?.description || ''
  )
  const [links, setLinks] = useState(initialData?.links || [])
  const [tasks, setTasks] = useState(initialData?.tasks || [])
  const [color, setColor] = useState(initialData?.color || 'yellow')

  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmit({
      title,
      description,
      links,
      tasks,
      color,
    })
  }

  const addLink = () => {
    setLinks([...links, { url: '', label: '', note: '' }])
  }

  const updateLink = (index, field, value) => {
    setLinks(
      links.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      )
    )
  }

  const removeLink = (index) => {
    setLinks(links.filter((_, i) => i !== index))
  }

  const addTask = () => {
    setTasks([
      ...tasks,
      { text: '', completed: false, durationMinutes: '' },
    ])
  }

  const updateTask = (index, field, value) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, [field]: value } : task
      )
    )
  }

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Idea title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      
      <section className="idea-form-section">
        <h2 className="idea-form-section-title">Links</h2>

        {links.map((link, index) => (
          <div className="idea-form-item" key={index}>
            <label>
              URL
              <input
                type="url"
                value={link.url}
                onChange={(e) => updateLink(index, 'url', e.target.value)}
              />
            </label>

            <label>
              Label <span className="optional-label">(optional)</span>
              <input
                type="text"
                value={link.label}
                onChange={(e) => updateLink(index, 'label', e.target.value)}
              />
            </label>

            <label>
              Note <span className="optional-label">(optional)</span>
              <input
                type="text"
                value={link.note}
                onChange={(e) => updateLink(index, 'note', e.target.value)}
              />
            </label>

            <button
              className="idea-form-remove-button"
              type="button"
              onClick={() => removeLink(index)}
            >
              Remove link
            </button>
          </div>
        ))}

        <button
          className="idea-form-secondary-button"
          type="button"
          onClick={addLink}
        >
          + Add link
        </button>
      </section>

            
      <section className="idea-form-section">
        <h2 className="idea-form-section-title">Checklist</h2>

        {tasks.map((task, index) => (
          <div className="idea-form-item" key={index}>
            <label>
              Task
              <input
                type="text"
                value={task.text}
                onChange={(e) => updateTask(index, 'text', e.target.value)}
              />
            </label>

            <label>
              Duration (minutes)
              <span className="optional-label"> (optional)</span>
              <input
                type="number"
                min="0"
                value={task.durationMinutes}
                onChange={(e) =>
                  updateTask(index, 'durationMinutes', e.target.value)
                }
              />
            </label>

            <button
              className="idea-form-remove-button"
              type="button"
              onClick={() => removeTask(index)}
            >
              Remove task
            </button>
          </div>
        ))}

        <button
          className="idea-form-secondary-button"
          type="button"
          onClick={addTask}
        >
          + Add task
        </button>
      </section>

      <div>
        <label htmlFor="color">Sticky-note color</label>
        <select
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        >
          <option value="yellow">Yellow</option>
          <option value="pink">Pink</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="lavender">Lavender</option>
        </select>
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save idea'}
      </button>
    </form>
  )
}

export default IdeaForm
