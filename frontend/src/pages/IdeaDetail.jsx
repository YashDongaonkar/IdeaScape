import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { getIdea, deleteIdea, updateIdea } from '../services/api'
import Checklist from '../components/Checklist'
import ProgressBar from '../components/ProgressBar'

const IdeaDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { accessToken } = useAuth()

  const [idea, setIdea] = useState(null)
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const data = await getIdea(id, accessToken)
        setIdea(data.idea)
        setTasks(data.idea.tasks || [])
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    if (accessToken && id) {
      fetchIdea()
    }
  }, [id, accessToken])

  const handleTasksChange = async (updatedTasks) => {
    setTasks(updatedTasks)
    setError('')

    try {
      await updateIdea(
        id,
        {
          ...idea,
          tasks: updatedTasks,
        },
        accessToken
      )

      setIdea((previousIdea) => ({
        ...previousIdea,
        tasks: updatedTasks,
      }))
    } catch (error) {
      setError(error.message)
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this idea?'
    )

    if (!confirmed) return

    try {
      await deleteIdea(id, accessToken)
      navigate('/board')
    } catch (error) {
      setError(error.message)
    }
  }

  if (isLoading) {
    return (
      <main className="idea-detail-page">
        <div className="idea-detail-container">
          <p>Loading idea...</p>
        </div>
      </main>
    )
  }

  if (error && !idea) {
    return (
      <main className="idea-detail-page">
        <div className="idea-detail-container">
          <p className="idea-detail-error" role="alert">{error}</p>
          <button
            className="idea-detail-back-button"
            onClick={() => navigate('/board')}
          >
            ← Back to board
          </button>
        </div>
      </main>
    )
  }

  if (!idea) {
    return (
      <main className="idea-detail-page">
        <div className="idea-detail-container">
          <p>Idea not found.</p>
          <button
            className="idea-detail-back-button"
            onClick={() => navigate('/board')}
          >
            ← Back to board
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="idea-detail-page">
      <div className="idea-detail-container">
        <button
          className="idea-detail-back-button"
          onClick={() => navigate('/board')}
        >
          ← Back to board
        </button>

        <section className={`idea-detail-card idea-detail-${idea.color || 'yellow'}`}>
          <div className="idea-detail-header">
            <div>
              <p className="idea-detail-eyebrow">YOUR IDEA</p>
              <h1>{idea.title}</h1>
            </div>

            <div className="idea-detail-actions">
              <button
                className="idea-detail-edit-button"
                onClick={() => navigate(`/ideas/${id}/edit`)}
              >
                Edit idea
              </button>

              <button
                className="idea-detail-delete-button"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>

          <p className="idea-detail-description">
            {idea.description || 'No description added yet.'}
          </p>
        </section>

        <section className="idea-detail-section">
          <h2>Links and resources</h2>

          {idea.links?.length > 0 ? (
            <div className="idea-detail-links">
              {idea.links.map((link, index) => (
                <article className="idea-detail-link-card" key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label || link.url}
                  </a>

                  {link.note && (
                    <p>{link.note}</p>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <p className="idea-detail-muted">No links added yet.</p>
          )}
        </section>

        <section className="idea-detail-section">
          <h2>Checklist</h2>

          {tasks.length > 0 ? (
            <>
              <ProgressBar tasks={tasks} />
              <Checklist
                tasks={tasks}
                onTasksChange={handleTasksChange}
              />
            </>
          ) : (
            <p className="idea-detail-muted">
              No tasks yet. Edit this idea to add a checklist.
            </p>
          )}
        </section>

        {error && (
          <p className="idea-detail-error" role="alert">
            {error}
          </p>
        )}
      </div>
    </main>
  )
}

export default IdeaDetail