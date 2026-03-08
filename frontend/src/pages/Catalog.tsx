import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import Input from '@/components/Input'
import BookCard from '@/components/BookCard'
import LoadingCard from '@/components/LoadingCard'
import EmptyState from '@/components/EmptyState'
import Button from '@/components/Button'
import { bookService } from '@/services/bookService'
import type { Book } from '@/types'

export default function Catalog() {
  const [books, setBooks] = useState<Book[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    loadBooks()
  }, [])

  const loadBooks = async (reset = false) => {
    try {
      const currentPage = reset ? 0 : page
      const response = await bookService.getAllBooks(currentPage, 24)
      
      if (reset) {
        setBooks(response.content)
      } else {
        setBooks([...books, ...response.content])
      }
      
      setHasMore(response.number < response.totalPages - 1)
      setPage(currentPage + 1)
    } catch (error) {
      console.error('Error loading books:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) {
      loadBooks(true)
      return
    }

    setIsLoading(true)
    try {
      const response = await bookService.searchBooks(searchQuery, 0, 24)
      setBooks(response.content)
      setHasMore(response.number < response.totalPages - 1)
      setPage(1)
    } catch (error) {
      console.error('Error searching books:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Catalogue de livres</h1>
        <p className="text-gray-600">Explorez notre collection de livres</p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Rechercher par titre, auteur, ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button type="submit" variant="primary">
          <Search className="w-5 h-5" />
          Rechercher
        </Button>
      </form>

      {/* Books Grid */}
      {isLoading && books.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {[...Array(12)].map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      ) : books.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          {hasMore && (
            <div className="text-center pt-4">
              <Button onClick={() => loadBooks()} isLoading={isLoading}>
                Charger plus
              </Button>
            </div>
          )}
        </>
      ) : (
        <EmptyState
          title="Aucun livre trouvé"
          description="Essayez de modifier votre recherche ou d'explorer le catalogue complet"
          action={
            <Button onClick={() => { setSearchQuery(''); loadBooks(true); }}>
              Réinitialiser la recherche
            </Button>
          }
        />
      )}
    </div>
  )
}
