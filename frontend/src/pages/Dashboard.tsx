import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Heart, TrendingUp, Target } from 'lucide-react'
import Card from '@/components/Card'
import LoadingSpinner from '@/components/LoadingSpinner'
import UserBookCard from '@/components/UserBookCard'
import BookCard from '@/components/BookCard'
import { userBookService } from '@/services/userBookService'
import { recommendationService } from '@/services/recommendationService'
import type { UserBook, Book, UserBookStats } from '@/types'

export default function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState<UserBookStats | null>(null)
  const [recentBooks, setRecentBooks] = useState<UserBook[]>([])
  const [recommendations, setRecommendations] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [statsData, booksData, recoData] = await Promise.all([
        userBookService.getStats(),
        userBookService.getUserBooks(0, 6),
        recommendationService.getRecommendations(6),
      ])
      
      setStats(statsData)
      setRecentBooks(booksData.content)
      setRecommendations(recoData)
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Header extraordinaire */}
      <div className="relative overflow-hidden rounded-3xl shadow-2xl">
        {/* Background avec gradient animé */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"></div>
        
        {/* Effet mesh gradient animé */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Particules flottantes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-2 h-2 bg-white/40 rounded-full animate-[float_6s_ease-in-out_infinite]"></div>
          <div className="absolute top-20 right-20 w-3 h-3 bg-white/30 rounded-full animate-[float_8s_ease-in-out_infinite_1s]"></div>
          <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-[float_7s_ease-in-out_infinite_2s]"></div>
          <div className="absolute bottom-10 right-1/3 w-2 h-2 bg-white/30 rounded-full animate-[float_9s_ease-in-out_infinite_3s]"></div>
          <div className="absolute top-1/2 left-10 w-1.5 h-1.5 bg-white/50 rounded-full animate-[float_5s_ease-in-out_infinite_1.5s]"></div>
          <div className="absolute top-1/3 right-10 w-1.5 h-1.5 bg-white/50 rounded-full animate-[float_6.5s_ease-in-out_infinite_2.5s]"></div>
        </div>
        
        {/* Formes décoratives */}
        <div className="absolute top-0 right-0 w-64 h-64 border-4 border-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 border-4 border-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        {/* Contenu */}
        <div className="relative px-8 py-12 md:px-12 md:py-16">
          <div className="max-w-4xl">
            {/* Badge animé */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6 shadow-lg border border-white/30 animate-[slideUp_0.6s_ease-out]">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
              Votre espace personnalisé
            </div>
            
            {/* Titre principal */}
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight animate-[slideUp_0.6s_ease-out_0.1s] opacity-0" style={{ animationFillMode: 'forwards' }}>
              Tableau de bord
            </h1>
            
            {/* Description */}
            <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl leading-relaxed animate-[slideUp_0.6s_ease-out_0.2s] opacity-0" style={{ animationFillMode: 'forwards' }}>
              Suivez votre progression, découvrez de nouvelles lectures et atteignez vos objectifs
            </p>
            
            {/* Barre de progression décorative */}
            <div className="mt-8 flex items-center gap-4 animate-[slideUp_0.6s_ease-out_0.3s] opacity-0" style={{ animationFillMode: 'forwards' }}>
              <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full shadow-lg" style={{ width: stats?.total ? `${Math.min((stats.finished / stats.total) * 100, 100)}%` : '0%' }}></div>
              </div>
              <span className="text-white/90 font-bold text-sm">
                {stats?.total ? Math.round((stats.finished / stats.total) * 100) : 0}% complété
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards avec animations et effets 3D */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="group relative animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative card-premium bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 group-hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">En cours</p>
                <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-cyan-600 mt-1">{stats?.reading || 0}</p>
                <p className="text-xs text-blue-500 font-medium mt-2">Livres actifs</p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl shadow-lg group-hover:shadow-2xl transition-shadow">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative card-premium bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 group-hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-1">Terminés</p>
                <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 to-green-600 mt-1">{stats?.finished || 0}</p>
                <p className="text-xs text-emerald-500 font-medium mt-2">Objectif atteint</p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-emerald-500 to-green-500 p-4 rounded-2xl shadow-lg group-hover:shadow-2xl transition-shadow">
                  <Target className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative animate-scale-in" style={{ animationDelay: '0.3s' }}>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative card-premium bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 group-hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-purple-600 font-bold uppercase tracking-wider mb-1">À lire</p>
                <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-pink-600 mt-1">{stats?.toRead || 0}</p>
                <p className="text-xs text-purple-500 font-medium mt-2">En attente</p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg group-hover:shadow-2xl transition-shadow">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative animate-scale-in" style={{ animationDelay: '0.4s' }}>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-600 to-red-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative card-premium bg-gradient-to-br from-rose-50 to-red-50 border-rose-200 group-hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-rose-600 font-bold uppercase tracking-wider mb-1">Total</p>
                <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-rose-600 to-red-600 mt-1">{stats?.total || 0}</p>
                <p className="text-xs text-rose-500 font-medium mt-2">Dans la bibliothèque</p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-rose-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-rose-500 to-red-500 p-4 rounded-2xl shadow-lg group-hover:shadow-2xl transition-shadow">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Books */}
      <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Lectures récentes
          </h2>
          <button
            onClick={() => navigate('/library')}
            className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
          >
            Voir tout 
            <span className="text-lg">→</span>
          </button>
        </div>

        {recentBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentBooks.map((book) => (
              <UserBookCard key={book.id} userBook={book} />
            ))}
          </div>
        ) : (
          <div className="card-premium text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium mb-2">
              Aucun livre dans votre bibliothèque
            </p>
            <p className="text-gray-400 mb-6">Explorez le catalogue pour commencer votre aventure</p>
            <button
              onClick={() => navigate('/catalog')}
              className="btn btn-primary"
            >
              Explorer le catalogue
            </button>
          </div>
        )}
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary-500 to-purple-500 p-2 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Recommandations pour vous
              </h2>
            </div>
            <button
              onClick={() => navigate('/recommendations')}
              className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
            >
              Voir tout
              <span className="text-lg">→</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {recommendations.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
