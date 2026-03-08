import api from '../lib/axios'
import type { Book, UserStatistics, ReadingGoal } from '../types'

export const recommendationService = {
  async getRecommendations(limit = 10): Promise<Book[]> {
    const response = await api.get<Book[]>('/recommendations', {
      params: { limit },
    })
    return response.data
  },

  async getSimilarBooks(bookId: number, limit = 10): Promise<Book[]> {
    const response = await api.get<Book[]>(`/recommendations/similar/${bookId}`, {
      params: { limit },
    })
    return response.data
  },

  async getUserStatistics(): Promise<UserStatistics> {
    const response = await api.get<UserStatistics>('/statistics')
    return response.data
  },

  async setReadingGoal(targetBooks: number, year: number): Promise<ReadingGoal> {
    const response = await api.post<ReadingGoal>('/statistics/goals', null, {
      params: { targetBooks, year },
    })
    return response.data
  },

  async getReadingGoal(year: number): Promise<ReadingGoal> {
    const response = await api.get<ReadingGoal>('/statistics/goals', {
      params: { year },
    })
    return response.data
  },

  async updateGoalProgress(year: number): Promise<ReadingGoal> {
    const response = await api.put<ReadingGoal>('/statistics/goals/refresh', null, {
      params: { year },
    })
    return response.data
  },

  async invalidateCache(): Promise<void> {
    await api.post('/statistics/cache/invalidate')
  },
}
