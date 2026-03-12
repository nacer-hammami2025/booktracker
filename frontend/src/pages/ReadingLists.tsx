import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Trash2, BookOpen } from 'lucide-react'
import toast from 'react-hot-toast'
import Card from '@/components/Card'
import Button from '@/components/Button'
import Input from '@/components/Input'
import LoadingSpinner from '@/components/LoadingSpinner'
import EmptyState from '@/components/EmptyState'
import { readingListService } from '@/services/readingListService'
import type { ReadingList } from '@/types'

export default function ReadingLists() {
  const navigate = useNavigate()
  const [lists, setLists] = useState<ReadingList[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newListName, setNewListName] = useState('')
  const [newListDescription, setNewListDescription] = useState('')

  useEffect(() => {
    loadLists()
  }, [])

  const loadLists = async () => {
    try {
      const data = await readingListService.getUserLists()
      setLists(data)
    } catch (error) {
      console.error('Error loading lists:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await readingListService.createList({
        name: newListName,
        description: newListDescription,
      })
      toast.success('Liste créée avec succès!')
      setShowCreateModal(false)
      setNewListName('')
      setNewListDescription('')
      loadLists()
    } catch (error) {
      toast.error('Erreur lors de la création')
    }
  }

  const handleDeleteList = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette liste ?')) return

    try {
      await readingListService.deleteList(id)
      toast.success('Liste supprimée')
      loadLists()
    } catch (error) {
      toast.error('Erreur lors de la suppression')
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Listes de Lecture</h1>
          <p className="text-gray-600">Organisez vos livres par thème ou objectif</p>
        </div>

        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
          <Plus className="w-5 h-5" />
          Nouvelle liste
        </Button>
      </div>

      {lists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lists.map((list) => (
            <Card key={list.id}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{list.name}</h3>
                </div>
                <button
                  onClick={() => handleDeleteList(list.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {list.description && (
                <p className="text-gray-600 text-sm mb-3">{list.description}</p>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{list.bookCount} livres</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/lists/${list.id}`)
                  }}
                >
                  Voir
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Aucune liste créée"
          description="Créez votre première liste pour organiser vos lectures"
          action={
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              <Plus className="w-5 h-5" />
              Créer une liste
            </Button>
          }
        />
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Nouvelle liste de lecture</h3>
            <form onSubmit={handleCreateList} className="space-y-4">
              <Input
                label="Nom de la liste"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="Ex: Été 2026"
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (optionnelle)
                </label>
                <textarea
                  className="input"
                  rows={3}
                  value={newListDescription}
                  onChange={(e) => setNewListDescription(e.target.value)}
                  placeholder="Description de votre liste..."
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" variant="primary" className="flex-1">
                  Créer
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowCreateModal(false)}
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
