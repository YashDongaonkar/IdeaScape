import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { getIdeas, deleteIdea } from '../services/api'
import IdeaCard from '../components/IdeaCard'

const IdeaBoard = () => {
  const { user, accessToken, logout } = useAuth()
  const [ideas, setIdeas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const data = await getIdeas(accessToken)
        setIdeas(data.ideas)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    if (accessToken) {
      fetchIdeas()
    }
  }, [accessToken])

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this idea?'
    )

    if (!confirmed) return

    try {
      await deleteIdea(id, accessToken)

      setIdeas((currentIdeas) =>
        currentIdeas.filter((idea) => idea._id !== id)
      )
    } catch (error) {
      setError(error.message)
    }
  }
  
  return (
    <>
      <header className="board-header">
        <div>
          <h1>Your IdeaScape Board</h1>
          <p>Welcome, {user?.username}!</p>
        </div>

        <button onClick={handleLogout}>
          Log out
        </button>
      </header>

      <div className="idea-board">
        {isLoading && <p>Loading your ideas...</p>}
        {error && <p role="alert">{error}</p>}

        {!isLoading && !error && ideas.length === 0 && (
          <p>You haven't saved any ideas yet.</p>
        )}

        {ideas.map((idea) => (
          <IdeaCard
            key={idea._id}
            idea={idea}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </>
  )
}

export default IdeaBoard
