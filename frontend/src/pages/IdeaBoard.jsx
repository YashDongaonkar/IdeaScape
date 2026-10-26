
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { getIdeas } from '../services/api'
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
    } else {
      setIsLoading(false)
    }
  }, [accessToken])

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  const handleSurpriseMe = () => {
    if (ideas.length === 0) return

    const randomIndex = Math.floor(Math.random() * ideas.length)
    const randomIdea = ideas[randomIndex]

    navigate(`/ideas/${randomIdea._id}`)
  }

  return (
    <>
      <header className="board-header">
        <div className="board-header-text">
          <h1>Your IdeaScape Board</h1>
          <div>Welcome, {user?.username}!</div>
        </div>

        <div className="board-header-actions">
          <button
            onClick={handleSurpriseMe}
            disabled={isLoading || ideas.length === 0}
            title={
              ideas.length === 0
                ? 'Create an idea first!'
                : 'Open a random idea'
            }
          >
            Surprise Me
          </button>

          <button onClick={() => navigate('/ideas/new')}>
            + Create Idea
          </button>

          <button onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>

      <div className="idea-board">
        {isLoading && <p>Loading your ideas...</p>}
        {error && <p role="alert">{error}</p>}

        {!isLoading && !error && ideas.length === 0 && (
          <p>You haven't saved any ideas yet.</p>
        )}

        {ideas.map((idea) => (
          <IdeaCard key={idea._id} idea={idea} />
        ))}
      </div>
    </>
  )
}

export default IdeaBoard
