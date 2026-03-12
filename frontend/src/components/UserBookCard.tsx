import { useNavigate } from 'react-router-dom'
import { BookOpen, Heart } from 'lucide-react'
import Card from './Card'
import Badge from './Badge'
import ProgressBar from './ProgressBar'
import type { UserBook } from '@/types'
import { formatShortDate } from '@/lib/utils'

interface UserBookCardProps {
  userBook: UserBook
  onUpdate?: () => void
}

export default function UserBookCard({ userBook }: UserBookCardProps) {
  const navigate = useNavigate()

  return (
    <Card className="relative" onClick={() => navigate(`/books/${userBook.bookId}`)}>
      {userBook.isFavorite && (
        <div className="absolute top-4 right-4 z-10">
          <Heart className="w-5 h-5 fill-red-500 text-red-500" />
        </div>
      )}
      
      <div className="flex gap-4">
        {userBook.bookThumbnail ? (
          <img
            src={userBook.bookThumbnail}
            alt={userBook.bookTitle}
            className="w-24 h-36 object-cover rounded-lg"
          />
        ) : (
          <div className="w-24 h-36 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 truncate">
            {userBook.bookTitle || 'Titre inconnu'}
          </h3>
          
          <div className="flex items-center gap-2 mb-3">
            <Badge status={userBook.status} />
            {userBook.startDate && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Débuté: {formatShortDate(userBook.startDate)}
              </span>
            )}
          </div>

          {userBook.status === 'READING' && userBook.bookPageCount && (
            <ProgressBar
              current={userBook.currentPage}
              total={userBook.bookPageCount}
              showLabel={true}
            />
          )}

          {userBook.status === 'FINISHED' && userBook.finishDate && (
            <p className="text-sm text-green-600 font-medium">
              Terminé le {formatShortDate(userBook.finishDate)}
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}
