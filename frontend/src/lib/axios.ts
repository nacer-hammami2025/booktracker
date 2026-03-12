import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

// API Base URL: Use environment variable or fallback to /api for local dev
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add JWT token and user ID
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Add X-User-Id header for tracker-service
    const userStr = localStorage.getItem('user')
    if (userStr && userStr !== 'undefined' && userStr !== 'null' && userStr.trim() && config.headers) {
      try {
        // Only try to parse if it looks like JSON
        if (userStr.startsWith('{') || userStr.startsWith('[')) {
          const user = JSON.parse(userStr)
          if (user?.id) {
            config.headers['X-User-Id'] = String(user.id)
          }
        } else {
          // Clean up corrupted data
          localStorage.removeItem('user')
        }
      } catch (error) {
        // Clean up corrupted data silently
        console.error('Error parsing user data:', error)
        localStorage.removeItem('user')
      }
    }
    
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      globalThis.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
