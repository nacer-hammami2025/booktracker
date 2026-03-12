import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, Trash2, BookOpen, Search, X } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '@/components/Button'
import Card from '@/components/Card'
import Input from '@/components/Input'
import LoadingSpinner from '@/components/LoadingSpinner'
import EmptyState from '@/components/EmptyState'
import { readingListService } from '@/services/readingListService'
import { bookService } from '@/services/bookService'
import type { ReadingList, Book } from '@/types'
import { truncate } from '@/lib/utils'

export default function ReadingListDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [list, setList] = useState<ReadingList | null>(null)
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Book[]>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (id) loadListDetails()
  }, [id])

  const loadListDetails = async () => {
    try {
      const listData = await readingListService.getListById(Number(id))
      setList(listData)

      // Charger les détails de tous les livres de la liste
      if (listData.bookIds && listData.bookIds.length > 0) {
        const bookPromises = listData.bookIds.map(bookId => 
          bookService.getBookById(bookId).catch(() => null)
        )
        const booksData = await Promise.all(bookPromises)
        setBooks(booksData.filter((book): book is Book => book !== null))
      } else {
        setBooks([])
      }
    } catch (error: any) {
      console.error('Error loading list details:', error)
      toast.error('Erreur lors du chargement de la liste')
      navigate('/lists')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const response = await bookService.searchBooks(searchQuery, 0, 10)
      setSearchResults(response.content)
    } catch (error) {
      console.error('Error searching books:', error)
      toast.error('Erreur lors de la recherche')
    } finally {
      setIsSearching(false)
    }
  }

  useEffect(() => {
    if (showAddModal) {
      const timer = setTimeout(() => {
        handleSearch()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [searchQuery, showAddModal])

  const handleAddBook = async (bookId: number) => {
    if (!list) return

    // Vérifier si le livre est déjà dans la liste
    if (list.bookIds.includes(bookId)) {
      toast.error('Ce livre est déjà dans la liste')
      return
    }

    try {
      await readingListService.addBookToList(list.id, bookId)
      toast.success('Livre ajouté à la liste!')
      setShowAddModal(false)
      setSearchQuery('')
      setSearchResults([])
      loadListDetails()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur lors de l\'ajout')
    }
  }

  const handleRemoveBook = async (bookId: number) => {
    if (!list) return

    if (!confirm('Êtes-vous sûr de vouloir retirer ce livre de la liste ?')) return

    try {
      await readingListService.removeBookFromList(list.id, bookId)
      toast.success('Livre retiré de la liste')
      loadListDetails()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur lors de la suppression')
    }
  }

  const handleDeleteList = async () => {
    if (!list) return

    if (!confirm('Êtes-vous sûr de vouloir supprimer cette liste ? Cette action est irréversible.')) return

    try {
      await readingListService.deleteList(list.id)
      toast.success('Liste supprimée avec succès')
      navigate('/lists')
    } catch (error: any) {
      console.error('Error deleting list:', error)
      toast.error('Erreur lors de la suppression')
    }
  }

  if (isLoading) return <LoadingSpinner />
  if (!list) return <EmptyState title="Liste introuvable" description="Cette liste n'existe pas ou a été supprimée" />

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Button
            variant="outline"
            onClick={() => navigate('/lists')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux listes
          </Button>

          <div className="flex items-start gap-4">
            <BookOpen className="w-8 h-8 text-primary-600 mt-1" />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{list.name}</h1>
              {list.description && (
                <p className="text-gray-600 mb-4">{list.description}</p>
              )}
              <p className="text-sm text-gray-500">
                {list.bookCount} {list.bookCount === 1 ? 'livre' : 'livres'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            <Plus className="w-5 h-5 mr-2" />
            Ajouter un livre
          </Button>
          <Button variant="danger" onClick={handleDeleteList}>
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Books Grid */}
      {books.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <Card key={book.id} className="relative group">
              {/* Remove button overlay */}
              <button
                onClick={() => handleRemoveBook(book.id)}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-700"
                title="Retirer de la liste"
                aria-label="Retirer de la liste"
              >
                <X className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate(`/books/${book.id}`)}
                className="cursor-pointer text-left w-full"
                aria-label={`Voir les détails de ${book.title}`}
              >
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
                    {truncate(book.description, 120)}
                  </p>
                )}

                {book.genres && book.genres.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {book.genres.slice(0, 2).map((genre) => (
                      <span
                        key={genre}
                        className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Liste vide"
          description="Ajoutez des livres à cette liste pour commencer"
          action={
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Ajouter un livre
            </Button>
          }
        />
      )}

      {/* Add Book Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Ajouter un livre à la liste</h3>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setSearchQuery('')
                  setSearchResults([])
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Search Input */}
            <div className="mb-4">
              <div className="relative">
                <Input
                  label="Rechercher un livre"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Titre, auteur, ISBN..."
                  autoFocus
                />
                <Search className="absolute right-3 top-9 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto">
              {isSearching ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner />
                </div>
              ) : (
                <>
                  {searchResults.length > 0 ? (
                    <div className="space-y-3">
                      {searchResults.map((book) => (
                        <div
                          key={book.id}
                          className="flex gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          {book.thumbnailUrl ? (
                            <img
                              src={book.thumbnailUrl}
                              alt={book.title}
                              className="w-16 h-24 object-cover rounded"
                            />
                          ) : (
                            <div className="w-16 h-24 bg-gray-200 rounded flex items-center justify-center">
                              <BookOpen className="w-6 h-6 text-gray-400" />
                            </div>
                          )}

                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{book.title}</h4>
                            {book.authors && book.authors.length > 0 && (
                              <p className="text-sm text-gray-600 mb-2">
                                {book.authors.join(', ')}
                              </p>
                            )}
                            {book.genres && book.genres.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {book.genres.slice(0, 3).map((genre) => (
                                  <span
                                    key={genre}
                                    className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
                                  >
                                    {genre}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleAddBook(book.id)}
                            disabled={list?.bookIds.includes(book.id)}
                          >
                            {list?.bookIds.includes(book.id) ? 'Déjà ajouté' : 'Ajouter'}
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      {searchQuery.trim() ? (
                        <EmptyState
                          title="Aucun résultat"
                          description="Essayez avec d'autres mots-clés"
                        />
                      ) : (
                        <EmptyState
                          title="Recherchez un livre"
                          description="Entrez le titre, l'auteur ou l'ISBN d'un livre"
                        />
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
