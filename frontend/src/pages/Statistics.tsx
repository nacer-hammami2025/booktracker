import { useEffect, useState } from 'react'
import { Target, TrendingUp, BookOpen, Award } from 'lucide-react'
import toast from 'react-hot-toast'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import Card from '@/components/Card'
import Button from '@/components/Button'
import Input from '@/components/Input'
import LoadingSpinner from '@/components/LoadingSpinner'
import { recommendationService } from '@/services/recommendationService'
import type { UserStatistics } from '@/types'

const COLORS = ['#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1']

export default function Statistics() {
  const [stats, setStats] = useState<UserStatistics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [goalTarget, setGoalTarget] = useState('')

  useEffect(() => {
    loadStatistics()
  }, [])

  const loadStatistics = async () => {
    try {
      const data = await recommendationService.getUserStatistics()
      setStats(data)
    } catch (error) {
      console.error('Error loading statistics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSetGoal = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await recommendationService.setReadingGoal(Number(goalTarget), new Date().getFullYear())
      toast.success('Objectif défini avec succès!')
      setShowGoalModal(false)
      loadStatistics()
    } catch (error) {
      console.error('Failed to set reading goal:', error)
      toast.error('Erreur lors de la définition de l\'objectif')
    }
  }

  if (isLoading) return <LoadingSpinner />
  if (!stats) return null

  // Prepare genre data for pie chart
  const genreData = Object.entries(stats.favoriteGenres || {}).map(([name, value]) => ({
    name,
    value,
  }))

  // Prepare monthly data for bar chart
  const monthlyData = Object.entries(stats.booksPerMonth || {}).map(([month, count]) => ({
    month,
    count,
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Statistiques de Lecture</h1>
          <p className="text-gray-600">Analysez vos habitudes de lecture</p>
        </div>

        <Button variant="primary" onClick={() => setShowGoalModal(true)}>
          <Target className="w-5 h-5" />
          Définir un objectif
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Livres lus</p>
              <p className="text-3xl font-bold text-blue-900">{stats.totalBooksRead}</p>
            </div>
            <BookOpen className="w-12 h-12 text-blue-600 opacity-50" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">En cours</p>
              <p className="text-3xl font-bold text-green-900">{stats.currentlyReading}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-600 opacity-50" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Critiques</p>
              <p className="text-3xl font-bold text-purple-900">{stats.totalReviews}</p>
            </div>
            <Award className="w-12 h-12 text-purple-600 opacity-50" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Note moyenne</p>
              <p className="text-3xl font-bold text-orange-900">
                {stats.averageRating?.toFixed(1) || 0}★
              </p>
            </div>
            <Award className="w-12 h-12 text-orange-600 opacity-50" />
          </div>
        </Card>
      </div>

      {/* Reading Goal */}
      {stats.currentYearGoal && (
        <Card className="bg-gradient-to-r from-primary-50 to-purple-50 border-primary-200">
          <div className="flex items-center gap-4 mb-4">
            <Target className="w-8 h-8 text-primary-600" />
            <div>
              <h3 className="text-xl font-bold text-gray-900">Objectif {stats.currentYearGoal.year}</h3>
              <p className="text-gray-600">
                {stats.currentYearGoal.currentProgress} / {stats.currentYearGoal.targetBooks} livres
              </p>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
              className="bg-primary-600 h-4 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(stats.currentYearGoal.progressPercentage, 100)}%` }}
            />
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{stats.currentYearGoal.progressPercentage.toFixed(0)}% complété</span>
            {stats.currentYearGoal.achieved && (
              <span className="text-green-600 font-medium">🎉 Objectif atteint !</span>
            )}
          </div>
        </Card>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Genre Distribution */}
        {genreData.length > 0 && (
          <Card>
            <h3 className="text-xl font-bold mb-4">Répartition par genre</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genreData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genreData.map((entry, index) => (
                    <Cell key={`cell-${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* Monthly Progress */}
        {monthlyData.length > 0 && (
          <Card>
            <h3 className="text-xl font-bold mb-4">Progression mensuelle</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#0ea5e9" name="Livres lus" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        )}
      </div>

      {/* Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Définir un objectif de lecture</h3>
            <form onSubmit={handleSetGoal} className="space-y-4">
              <Input
                label={`Nombre de livres pour ${new Date().getFullYear()}`}
                type="number"
                min="1"
                value={goalTarget}
                onChange={(e) => setGoalTarget(e.target.value)}
                placeholder="Ex: 24"
                required
              />

              <div className="flex gap-2">
                <Button type="submit" variant="primary" className="flex-1">
                  Définir
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowGoalModal(false)}
                >
                  Annuler
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}
