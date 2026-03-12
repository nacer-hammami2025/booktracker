import api from '../lib/axios'
import type { LoginRequest, RegisterRequest, AuthResponse, User } from '../types'

// Backend response format (different from our AuthResponse)
interface BackendAuthResponse {
  token: string
  type: string
  userId: number
  username: string
  email: string
  role: 'READER' | 'ADMIN'
  expiresIn: number
}

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<BackendAuthResponse>('/auth/login', data)
    // Transform backend response to our AuthResponse format
    return {
      token: response.data.token,
      user: {
        id: response.data.userId,
        username: response.data.username,
        email: response.data.email,
        role: response.data.role,
      }
    }
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<BackendAuthResponse>('/auth/register', data)
    // Transform backend response to our AuthResponse format
    return {
      token: response.data.token,
      user: {
        id: response.data.userId,
        username: response.data.username,
        email: response.data.email,
        role: response.data.role,
      }
    }
  },

  async getProfile(): Promise<User> {
    const response = await api.get<User>('/auth/profile')
    return response.data
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await api.put<User>('/auth/profile', data)
    return response.data
  },
}
