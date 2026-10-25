import { useState } from 'react'
import { Link } from 'react-router'
import { apiRequest } from '../services/api'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setMessage('')
    setIsSuccess(false)
    setIsLoading(true)

    try {
      const data = await apiRequest('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      })

      setMessage(data.message || 'Your account has been created.')
      setIsSuccess(true)
      setUsername('')
      setEmail('')
      setPassword('')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link to="/" className="auth-brand">
          IdeaScape<span>.</span>
        </Link>

        <p className="auth-eyebrow">A FRESH SPACE FOR YOUR IDEAS</p>

        <h1>Make room for ideas.</h1>

        <p className="auth-subtitle">
          Create your account and give those ideas a place to grow.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>

          {message && (
            <p
              className={`auth-message ${isSuccess ? 'auth-success-message' : ''}`}
              role="status"
            >
              {message}
            </p>
          )}

          <button
            className="auth-submit-button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </section>

      <p className="auth-footer">
        A landscape of possibilities.
      </p>
    </main>
  )
}

export default Signup