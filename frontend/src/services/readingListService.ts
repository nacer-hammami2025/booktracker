import api from '../lib/axios'
import type { ReadingList, CreateListRequest } from '../types'

export const readingListService = {
  async createList(data: CreateListRequest): Promise<ReadingList> {
    const response = await api.post<ReadingList>('/tracker/reading-lists', data)
    return response.data
  },

  async getUserLists(): Promise<ReadingList[]> {
    const response = await api.get<ReadingList[]>('/tracker/reading-lists')
    return response.data
  },

  async getListById(id: number): Promise<ReadingList> {
    const response = await api.get<ReadingList>(`/tracker/reading-lists/${id}`)
    return response.data
  },

  async updateList(id: number, data: Partial<CreateListRequest>): Promise<ReadingList> {
    const response = await api.put<ReadingList>(`/tracker/reading-lists/${id}`, data)
    return response.data
  },

  async deleteList(id: number): Promise<void> {
    await api.delete(`/tracker/reading-lists/${id}`)
  },

  async addBookToList(listId: number, bookId: number): Promise<void> {
    await api.post(`/tracker/reading-lists/${listId}/books/${bookId}`)
  },

  async removeBookFromList(listId: number, bookId: number): Promise<void> {
    await api.delete(`/tracker/reading-lists/${listId}/books/${bookId}`)
  },
}
