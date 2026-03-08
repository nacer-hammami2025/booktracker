import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, Plus, Star } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '@/components/Button'
import Card from '@/components/Card'
import Badge from '@/components/Badge'
import Rating from '@/components/Rating'
import LoadingSpinner from '@/components/LoadingSpinner'
import { bookService } from '@/services/bookService'
import { userBookService } from '@/services/userBookService'
import { reviewService } from '@/services/reviewService'
import type { Book, Review, ReadingStatus, BookRating } from '@/types'
import { formatDate } from '@/lib/utils'

export default function BookDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [book, setBook] = useState<Book | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [bookRating, setBookRating] = useState<BookRating | null>(null)
  const [userReview, setUserReview] = useState<Review | null>(null)
  const [userBook, setUserBook] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    content: ''
  })

  useEffect(() => {
    if (id) loadBookDetails()
  }, [id])

  const loadBookDetails = async () => {
    try {
      const bookData = await bookService.getBookById(Number(id))
      setBook(bookData)

      try {
        const reviewsData = await reviewService.getBookReviews(Number(id), 0, 10)
        setReviews(reviewsData.content)
        
        const ratingData = await reviewService.getBookRating(Number(id))
        setBookRating(ratingData)

        const userReviewData = await reviewService.getUserReview(Number(id))
        setUserReview(userReviewData)
      } catch (error) {
        // User might not have review yet - this is expected
        console.debug('No existing review found', error)
      }

      // Check if user already has this book in library
      try {
        const userBookData = await userBookService.getUserBookByBookId(Number(id))
        setUserBook(userBookData)
      } catch (error) {
        // User doesn't have this book yet
        console.debug('Book not in user library', error)
      }
    } catch (error) {
      console.error('Failed to load book details:', error)
      toast.error('Erreur lors du chargement du livre')
      navigate('/catalog')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddToLibrary = async (status: ReadingStatus) => {
    try {
      const addedBook = await userBookService.addBook({
        bookId: Number(id),
        status,
        currentPage: 0,
      })
      setUserBook(addedBook)
      toast.success('Livre ajouté à votre bibliothèque!')
      setShowAddModal(false)
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur lors de l\'ajout')
    }
  }

  const handleSubmitReview = async () => {
    if (!reviewForm.content.trim() && reviewForm.rating === 0) {
      toast.error('Veuillez ajouter une note ou un commentaire')
      return
    }

    try {
      const newReview = await reviewService.createOrUpdateReview({
        bookId: Number(id),
        rating: reviewForm.rating,
        content: reviewForm.content.trim() || undefined
      })
      setUserReview(newReview)
      toast.success('Critique publiée avec succès!')
      setShowReviewModal(false)
      setReviewForm({ rating: 5, content: '' })
      loadBookDetails() // Reload to get updated reviews
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur lors de la publication')
    }
  }

  if (isLoading) return <LoadingSpinner />
  if (!book) return null

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-5 h-5" />
        Retour
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Book Info */}
        <div className="lg:col-span-2">
          <div className="flex gap-6 mb-6">
            {book.thumbnailUrl ? (
              <img
                src={book.thumbnailUrl}
                alt={book.title}
                className="w-48 h-72 object-cover rounded-lg shadow-lg"
              />
            ) : (
              <div className="w-48 h-72 bg-gray-200 rounded-lg flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-gray-400" />
              </div>
            )}

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
              
              {book.authors && book.authors.length > 0 && (
                <p className="text-xl text-gray-600 mb-3">{book.authors.join(', ')}</p>
              )}

              {bookRating && (
                <div className="flex items-center gap-2 mb-3">
                  <Rating rating={Math.round(bookRating.averageRating)} readonly size="md" />
                  <span className="text-sm text-gray-600">
                    {bookRating.averageRating.toFixed(1)} ({bookRating.reviewCount} avis)
                  </span>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {book.genres?.map((genre) => (
                  <Badge key={genre}>{genre}</Badge>
                ))}
              </div>

              {book.pageCount && (
                <p className="text-gray-600 mb-2">{book.pageCount} pages</p>
              )}

              {book.publishedDate && (
                <p className="text-gray-600 mb-4">Publié: {formatDate(book.publishedDate)}</p>
              )}

              {!userBook && (
                <Button variant="primary" onClick={() => setShowAddModal(true)}>
                  <Plus className="w-5 h-5" />
                  Ajouter à ma bibliothèque
                </Button>
              )}
            </div>
          </div>

          {book.description && (
            <Card>
              <h2 className="text-xl font-bold mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">{book.description}</p>
            </Card>
          )}
        </div>

        {/* Reviews */}
        <div>
          <Card>
            <h2 className="text-xl font-bold mb-4">Critiques</h2>
            
            {!userReview && (
              <Button variant="outline" className="w-full mb-4" onClick={() => setShowReviewModal(true)}>
                <Star className="w-5 h-5" />
                Écrire une critique
              </Button>
            )}

            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.slice(0, 5).map((review) => (
                  <div key={review.id} className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{review.username || 'Anonyme'}</span>
                      <Rating rating={review.rating} readonly size="sm" />
                    </div>
                    {review.content && (
                      <p className="text-sm text-gray-700">{review.content}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">Aucune critique pour le moment</p>
            )}
          </Card>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Ajouter à ma bibliothèque</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleAddToLibrary('TO_READ')}
              >
                À lire
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleAddToLibrary('READING')}
              >
                En cours
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleAddToLibrary('FINISHED')}
              >
                Terminé
              </Button>
            </div>
            <Button variant="secondary" className="w-full mt-4" onClick={() => setShowAddModal(false)}>
              Annuler
            </Button>
          </Card>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-lg w-full">
            <h3 className="text-2xl font-bold mb-6">Écrire une critique</h3>
            
            <div className="space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Votre note
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          star <= reviewForm.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Votre avis (optionnel)
                </label>
                <textarea
                  value={reviewForm.content}
                  onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })}
                  placeholder="Partagez votre avis sur ce livre..."
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={handleSubmitReview}
                >
                  Publier
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => {
                    setShowReviewModal(false)
                    setReviewForm({ rating: 5, content: '' })
                  }}
                >
                  Annuler
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
