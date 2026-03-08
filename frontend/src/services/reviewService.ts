import api from '../lib/axios'
import type { 
  Review, 
  CreateReviewRequest, 
  BookRating,
  PageResponse 
} from '../types'

export const reviewService = {
  async createOrUpdateReview(data: CreateReviewRequest): Promise<Review> {
    const response = await api.post<Review>('/reviews', data)
    return response.data
  },

  async getUserReview(bookId: number): Promise<Review> {
    const response = await api.get<Review>(`/reviews/book/${bookId}/user`)
    return response.data
  },

  async getBookReviews(bookId: number, page = 0, size = 10): Promise<PageResponse<Review>> {
    const response = await api.get<PageResponse<Review>>(`/reviews/book/${bookId}`, {
      params: { page, size },
    })
    return response.data
  },

  async getBookRating(bookId: number): Promise<BookRating> {
    const response = await api.get<BookRating>(`/reviews/book/${bookId}/rating`)
    return response.data
  },

  async deleteReview(bookId: number): Promise<void> {
    await api.delete(`/reviews/book/${bookId}`)
  },
}
