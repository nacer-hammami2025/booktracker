import { useEffect, useState } from 'react'
import { Filter } from 'lucide-react'
import UserBookCard from '@/components/UserBookCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import EmptyState from '@/components/EmptyState'
import Button from '@/components/Button'
import { userBookService } from '@/services/userBookService'
import type { UserBook, ReadingStatus } from '@/types'

export default function Library() {
  const [books, setBooks] = useState<UserBook[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<ReadingStatus | 'ALL'>('ALL')

  useEffect(() => {
    loadBooks()
  }, [selectedStatus])

  const loadBooks = async () => {
    setIsLoading(true)
    try {
      if (selectedStatus === 'ALL') {
        const response = await userBookService.getUserBooks(0, 100)
        setBooks(response.content)
      } else {
        const response = await userBookService.getBooksByStatus(selectedStatus, 0, 100)
        setBooks(response.content)
      }
    } catch (error) {
      console.error('Error loading books:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const statusFilters = [
    { label: 'Tous', value: 'ALL' },
    { label: 'À lire', value: 'TO_READ' },
    { label: 'En cours', value: 'READING' },
    { label: 'Terminés', value: 'FINISHED' },
    { label: 'Abandonnés', value: 'ABANDONED' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ma Bibliothèque</h1>
        <p className="text-gray-600">Gérez vos lectures et suivez votre progression</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
        {statusFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setSelectedStatus(filter.value as ReadingStatus | 'ALL')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedStatus === filter.value
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Books Grid */}
      {isLoading ? (
        <LoadingSpinner />
      ) : books.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <UserBookCard key={book.id} userBook={book} onUpdate={loadBooks} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Aucun livre trouvé"
          description="Commencez par ajouter des livres à votre bibliothèque depuis le catalogue"
          action={
            <Button onClick={() => globalThis.location.href = '/catalog'}>
              Explorer le catalogue
            </Button>
          }
        />
      )}
    </div>
  )
}
