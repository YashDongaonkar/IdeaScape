const API_BASE_URL = 'http://localhost:5000/api'

const apiRequest = async (endpoint, options = {}, accessToken = null) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong')
  }

  return data
}

const getIdeas = async (accessToken) => {
  return apiRequest('/ideas', {}, accessToken)
}

const getIdea = async (id, accessToken) => {
  return apiRequest(`/ideas/${id}`, {}, accessToken)
}

const createIdea = async (ideaData, accessToken) => {
  return apiRequest(
    '/ideas',
    {
      method: 'POST',
      body: JSON.stringify(ideaData),
    },
    accessToken
  )
}

const updateIdea = async (id, ideaData, accessToken) => {
  return apiRequest(
    `/ideas/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(ideaData),
    },
    accessToken
  )
}

const deleteIdea = async (id, accessToken) => {
  return apiRequest(
    `/ideas/${id}`,
    {
      method: 'DELETE',
    },
    accessToken
  )
}

export {
  API_BASE_URL,
  apiRequest,
  getIdeas,
  getIdea,
  createIdea,
  updateIdea,
  deleteIdea,
}
