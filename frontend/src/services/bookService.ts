import api from '../lib/axios'
import type { Book, CreateBookRequest, PageResponse } from '../types'

export const bookService = {
  async getAllBooks(page = 0, size = 20): Promise<PageResponse<Book>> {
    const response = await api.get<PageResponse<Book>>('/books', {
      params: { page, size },
    })
    return response.data
  },

  async searchBooks(query: string, page = 0, size = 20): Promise<PageResponse<Book>> {
    const response = await api.get<PageResponse<Book>>('/books/search', {
      params: { query, page, size },
    })
    return response.data
  },

  async getBookById(id: number): Promise<Book> {
    const response = await api.get<Book>(`/books/${id}`)
    return response.data
  },

  async createBook(data: CreateBookRequest): Promise<Book> {
    const response = await api.post<Book>('/books', data)
    return response.data
  },

  async updateBook(id: number, data: Partial<CreateBookRequest>): Promise<Book> {
    const response = await api.put<Book>(`/books/${id}`, data)
    return response.data
  },

  async deleteBook(id: number): Promise<void> {
    await api.delete(`/books/${id}`)
  },

  async getBooksByGenre(genre: string, page = 0, size = 20): Promise<PageResponse<Book>> {
    const response = await api.get<PageResponse<Book>>(`/books/genre/${genre}`, {
      params: { page, size },
    })
    return response.data
  },

  async searchGoogleBooks(query: string): Promise<Book[]> {
    const response = await api.get<Book[]>('/books/google/search', {
      params: { query },
    })
    return response.data
  },

  async importFromGoogle(googleBooksId: string): Promise<Book> {
    const response = await api.post<Book>(`/books/google/import/${googleBooksId}`)
    return response.data
  },
}
