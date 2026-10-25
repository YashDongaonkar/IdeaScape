
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

      <fieldset>
        <legend>Links</legend>

        {links.map((link, index) => (
          <div key={index}>
            <label>
              URL
              <input
                type="url"
                value={link.url}
                onChange={(e) =>
                  updateLink(index, 'url', e.target.value)
                }
              />
            </label>

            <label>
              Label
              <input
                type="text"
                value={link.label}
                onChange={(e) =>
                  updateLink(index, 'label', e.target.value)
                }
              />
            </label>

            <label>
              Note
              <input
                type="text"
                value={link.note}
                onChange={(e) =>
                  updateLink(index, 'note', e.target.value)
                }
              />
            </label>

            <button type="button" onClick={() => removeLink(index)}>
              Remove link
            </button>
          </div>
        ))}

        <button type="button" onClick={addLink}>
          Add link
        </button>
      </fieldset>

      <fieldset>
        <legend>Checklist</legend>

        {tasks.map((task, index) => (
          <div key={index}>
            <label>
              Task
              <input
                type="text"
                value={task.text}
                onChange={(e) =>
                  updateTask(index, 'text', e.target.value)
                }
              />
            </label>

            <label>
              Duration (minutes)
              <input
                type="number"
                min="0"
                value={task.durationMinutes}
                onChange={(e) =>
                  updateTask(index, 'durationMinutes', e.target.value)
                }
              />
            </label>

            <button type="button" onClick={() => removeTask(index)}>
              Remove task
            </button>
          </div>
        ))}

        <button type="button" onClick={addTask}>
          Add task
        </button>
      </fieldset>

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
