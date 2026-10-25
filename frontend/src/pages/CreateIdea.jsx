
import { useState } from 'react'
import { useNavigate } from 'react-router'
import IdeaForm from '../components/IdeaForm'
import { useAuth } from '../context/AuthContext'
import { createIdea } from '../services/api'

const CreateIdea = () => {
  const { accessToken } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (ideaData) => {
    setIsLoading(true)
    setError('')

    try {
      const cleanedData = {
        ...ideaData,
          position: {
          x: Math.random() * 700,
          y: Math.random() * 400,
        },
        rotation: Math.random() * 10 - 5,
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
            durationMinutes:
              task.durationMinutes === ''
                ? 0
                : Number(task.durationMinutes),
          })),
      }

      await createIdea(cleanedData, accessToken)
      navigate('/board')
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h1>Create an idea</h1>

      {error && <p role="alert">{error}</p>}

      <IdeaForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  )
}

export default CreateIdea
