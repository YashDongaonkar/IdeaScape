
import { useNavigate } from 'react-router'

const IdeaCard = ({ idea }) => {
  const navigate = useNavigate()

  const noteColors = {
    yellow: '#FFF3A6',
    pink: '#FFD6E0',
    blue: '#CDEBFF',
    green: '#D7F5D0',
    lavender: '#E6D9FF',
  }

  return (
    <article
      className="idea-card"
      onClick={() => navigate(`/ideas/${idea._id}`)}
      style={{
        '--note-rotation': `${idea.rotation ?? 0}deg`,
        backgroundColor: noteColors[idea.color] || noteColors.yellow,
        position: 'absolute',
        left: `${idea.position?.x ?? 24}px`,
        top: `${idea.position?.y ?? 24}px`,
      }}
    >
      <h2>{idea.title}</h2>
      <p>{idea.description}</p>
    </article>
  )
}

export default IdeaCard
