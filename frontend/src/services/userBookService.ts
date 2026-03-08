import api from '../lib/axios'
import type { 
  UserBook, 
  AddBookRequest, 
  UserBookStats,
  PageResponse 
} from '../types'

export const userBookService = {
  async addBook(data: AddBookRequest): Promise<UserBook> {
    const response = await api.post<UserBook>('/user-books', data)
    return response.data
  },

  async getUserBooks(page = 0, size = 20): Promise<PageResponse<UserBook>> {
    const response = await api.get<PageResponse<UserBook>>('/user-books', {
      params: { page, size },
    })
    return response.data
  },

  async getUserBookByBookId(bookId: number): Promise<UserBook | null> {
    try {
      const response = await api.get<UserBook>(`/user-books/book/${bookId}`)
      return response.data
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null
      }
      throw error
    }
  },

  async getBooksByStatus(status: string, page = 0, size = 20): Promise<PageResponse<UserBook>> {
    const response = await api.get<PageResponse<UserBook>>(`/user-books/status/${status}`, {
      params: { page, size },
    })
    return response.data
  },

  async getFavorites(page = 0, size = 20): Promise<PageResponse<UserBook>> {
    const response = await api.get<PageResponse<UserBook>>('/user-books/favorites', {
      params: { page, size },
    })
    return response.data
  },

  async updateProgress(id: number, currentPage: number): Promise<UserBook> {
    const response = await api.put<UserBook>(`/user-books/${id}/progress`, null, {
      params: { currentPage },
    })
    return response.data
  },

  async updateStatus(id: number, status: string): Promise<UserBook> {
    const response = await api.put<UserBook>(`/user-books/${id}/status`, null, {
      params: { status },
    })
    return response.data
  },

  async toggleFavorite(id: number): Promise<UserBook> {
    const response = await api.put<UserBook>(`/user-books/${id}/favorite`)
    return response.data
  },

  async removeBook(id: number): Promise<void> {
    await api.delete(`/user-books/${id}`)
  },

  async getStats(): Promise<UserBookStats> {
    const response = await api.get<UserBookStats>('/user-books/stats')
    return response.data
  },
}
