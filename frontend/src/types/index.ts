// User & Auth types
export interface User {
  id: number
  username: string
  email: string
  role: 'READER' | 'ADMIN'
}

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}

// Book types
export interface Book {
  id: number
  title: string
  isbn?: string
  description?: string
  publishedDate?: string
  pageCount?: number
  thumbnailUrl?: string
  googleBooksId?: string
  authors: string[]
  genres: string[]
  createdAt: string
}

export interface CreateBookRequest {
  title: string
  isbn?: string
  description?: string
  publishedDate?: string
  pageCount?: number
  thumbnailUrl?: string
  authors: string[]
  genres: string[]
}

export interface PageResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  number: number
  size: number
}

// UserBook types
export type ReadingStatus = 'TO_READ' | 'READING' | 'FINISHED' | 'ABANDONED'

export interface UserBook {
  id: number
  userId: number
  bookId: number
  status: ReadingStatus
  currentPage: number
  startDate?: string
  finishDate?: string
  isFavorite: boolean
  bookTitle?: string
  bookThumbnail?: string
  bookPageCount?: number
  createdAt: string
}

export interface AddBookRequest {
  bookId: number
  status: ReadingStatus
  currentPage: number
}

export interface UserBookStats {
  toRead: number
  reading: number
  finished: number
  abandoned: number
  total: number
}

// Review types
export interface Review {
  id: number
  userId: number
  bookId: number
  rating: number
  content?: string
  quote?: string
  username?: string
  bookTitle?: string
  createdAt: string
  updatedAt: string
}

export interface CreateReviewRequest {
  bookId: number
  rating: number
  content?: string
  quote?: string
}

export interface BookRating {
  averageRating: number
  reviewCount: number
}

// ReadingList types
export interface ReadingList {
  id: number
  userId: number
  name: string
  description?: string
  bookIds: number[]
  bookCount: number
  createdAt: string
}

export interface CreateListRequest {
  name: string
  description?: string
}

// Recommendation types
export interface UserStatistics {
  totalBooksRead: number
  currentlyReading: number
  toReadCount: number
  abandonedCount: number
  favoriteGenres: Record<string, number>
  booksPerMonth: Record<string, number>
  currentYearGoal?: ReadingGoal
  averageRating: number
  totalReviews: number
}

export interface ReadingGoal {
  id: number
  userId: number
  targetBooks: number
  year: number
  currentProgress: number
  progressPercentage: number
  achieved: boolean
  createdAt: string
}

export interface GenreStatistic {
  genre: string
  count: number
}
