import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import IdeaForm from '../components/IdeaForm'
import { useAuth } from '../context/AuthContext'
import { getIdea, updateIdea } from '../services/api'

const EditIdea = () => {
  const { id } = useParams()
  const { accessToken } = useAuth()
  const navigate = useNavigate()

  const [idea, setIdea] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        setIsLoading(true)
        setError('')
        const data = await getIdea(id, accessToken)
        setIdea(data.idea)
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

  const handleSubmit = async (ideaData) => {
    setIsSaving(true)
    setError('')

    try {
      const cleanedData = {
        ...ideaData,
        links: ideaData.links
          .filter((link) => link.url.trim() !== '')
          .map((link) => ({
            ...link,
            url: link.url.trim(),
            label: link.label.trim(),
            note: link.note.trim(),
          })),
        tasks: ideaData.tasks
          .filter((task) => task.text.trim() !== '')
          .map((task) => ({
            ...task,
            text: task.text.trim(),
            completed: Boolean(task.completed),
            durationMinutes:
              task.durationMinutes === ''
                ? 0
                : Number(task.durationMinutes),
          })),
      }

      await updateIdea(id, cleanedData, accessToken)
      navigate('/board')
    } catch (error) {
      setError(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <main className="create-idea-page">
        <div className="create-idea-container">
          <p>Loading idea...</p>
        </div>
      </main>
    )
  }

  if (error && !idea) {
    return (
      <main className="create-idea-page">
        <div className="create-idea-container">
          <p className="create-idea-error" role="alert">{error}</p>
          <button
            className="back-to-board-button"
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
      <main className="create-idea-page">
        <div className="create-idea-container">
          <p>Idea not found.</p>
          <button
            className="back-to-board-button"
            onClick={() => navigate('/board')}
          >
            ← Back to board
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="create-idea-page">
      <div className="create-idea-container">
        <button
          className="back-to-board-button"
          onClick={() => navigate('/board')}
        >
          ← Back to board
        </button>

        <h1>Edit your idea</h1>
        <p className="create-idea-subtitle">
          Refine the thought. Change the plan. Keep the possibility.
        </p>

        {error && (
          <p className="create-idea-error" role="alert">
            {error}
          </p>
        )}

        <div className="create-idea-form-card">
          <IdeaForm
            key={idea._id}
            initialData={idea}
            onSubmit={handleSubmit}
            isLoading={isSaving}
          />
        </div>
      </div>
    </main>
  )
}

export default EditIdea