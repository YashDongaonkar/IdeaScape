import { createContext, useContext, useEffect, useState } from 'react'
import { apiRequest } from '../services/api'

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const data = await apiRequest('/auth/refresh')
        setAccessToken(data.accessToken)
        setUser(data.user)
      } catch {
        setAccessToken(null)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }
    restoreSession()
  }, [])


  const login = (token, userData) => {
    setAccessToken(token)
    setUser(userData)
  }

  
  const logout = async () => {
    try {
      await apiRequest('/auth/logout', {
        method: 'POST',
      })
    } finally {
      setAccessToken(null)
      setUser(null)
    }
  }


  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
