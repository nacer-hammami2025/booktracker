import { useNavigate } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import Card from './Card'
import type { Book } from '@/types'
import { truncate } from '@/lib/utils'

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: Readonly<BookCardProps>) {
  const navigate = useNavigate()

  return (
    <Card onClick={() => navigate(`/books/${book.id}`)}>
      {book.thumbnailUrl ? (
        <img
          src={book.thumbnailUrl}
          alt={book.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
          <BookOpen className="w-12 h-12 text-gray-400" />
        </div>
      )}

      <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
        {book.title}
      </h3>

      {book.authors && book.authors.length > 0 && (
        <p className="text-sm text-gray-600 mb-2">
          {book.authors.join(', ')}
        </p>
      )}

      {book.description && (
        <p className="text-sm text-gray-500 line-clamp-3">
          {truncate(book.description, 150)}
        </p>
      )}

      {book.genres && book.genres.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {book.genres.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded"
            >
              {genre}
            </span>
          ))}
        </div>
      )}
    </Card>
  )
}
