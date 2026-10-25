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
    try {
        await updateIdea(
        id,
        {
            ...idea,
            tasks: updatedTasks,
        },
        accessToken
        )
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
    return <p>Loading idea...</p>
  }

  if (error && !idea) {
    return (
      <div>
        <p role="alert">{error}</p>
        <button onClick={() => navigate('/board')}>
          Back to board
        </button>
      </div>
    )
  }

  if (!idea) {
    return <p>Idea not found.</p>
  }

  return (
    <div>
      <button onClick={() => navigate('/board')}>
        Back to board
      </button>

      <h1>{idea.title}</h1>
      <p>{idea.description}</p>

      <h2>Links</h2>
      {idea.links?.length > 0 ? (
        idea.links.map((link, index) => (
          <div key={index}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label || link.url}
            </a>
            {link.note && <p>{link.note}</p>}
          </div>
        ))
      ) : (
        <p>No links added.</p>
      )}

      <ProgressBar tasks={tasks} />

      <Checklist
        tasks={tasks}
        onTasksChange={handleTasksChange}
      />

      <button onClick={() => navigate(`/ideas/${id}/edit`)}>
        Edit idea
      </button>

      <button onClick={handleDelete}>
        Delete idea
      </button>

      {error && <p role="alert">{error}</p>}
    </div>
  )
}

export default IdeaDetail
