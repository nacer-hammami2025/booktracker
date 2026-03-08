import { useEffect, useState } from 'react'
import { TrendingUp, Sparkles } from 'lucide-react'
import BookCard from '@/components/BookCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import EmptyState from '@/components/EmptyState'
import Card from '@/components/Card'
import { recommendationService } from '@/services/recommendationService'
import type { Book } from '@/types'

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadRecommendations()
  }, [])

  const loadRecommendations = async () => {
    try {
      const data = await recommendationService.getRecommendations(24)
      setRecommendations(data)
    } catch (error) {
      console.error('Error loading recommendations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-8 h-8 text-primary-600" />
          <h1 className="text-3xl font-bold text-gray-900">Recommandations Personnalisées</h1>
        </div>
        <p className="text-gray-600">
          Découvrez de nouveaux livres basés sur vos préférences de lecture
        </p>
      </div>

      {recommendations.length > 0 ? (
        <>
          <Card className="bg-gradient-to-r from-primary-50 to-purple-50 border-primary-200">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Comment ça marche ?
                </h3>
                <p className="text-sm text-gray-700">
                  Nous analysons vos lectures terminées et vos favoris pour identifier vos genres
                  préférés. Ensuite, nous vous proposons des livres similaires que vous n'avez pas
                  encore lus.
                </p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {recommendations.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          title="Aucune recommandation disponible"
          description="Lisez et notez quelques livres pour recevoir des recommandations personnalisées"
        />
      )}
    </div>
  )
}
