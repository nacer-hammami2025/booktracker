import { useState } from 'react'
import { User, Mail, Shield } from 'lucide-react'
import toast from 'react-hot-toast'
import Card from '@/components/Card'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { useAuthStore } from '@/stores/authStore'
import { authService } from '@/services/authService'

export default function Profile() {
  const { user, updateUser } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const updatedUser = await authService.updateProfile(formData)
      updateUser(updatedUser)
      toast.success('Profil mis à jour avec succès!')
      setIsEditing(false)
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur lors de la mise à jour')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon Profil</h1>
        <p className="text-gray-600">Gérez vos informations personnelles</p>
      </div>

      {/* Profile Card */}
      <Card>
        <div className="flex items-center gap-6 mb-6">
          {/* Avatar premium avec effet Quantum Orb */}
          <div className="relative w-32 h-32 group">
            {/* Cercles orbitaux */}
            <div className="absolute inset-0 rounded-full border-2 border-indigo-200/40 animate-[orbit_15s_linear_infinite]"></div>
            <div className="absolute inset-0 rounded-full border-2 border-purple-200/30 animate-[orbitReverse_20s_linear_infinite]"></div>
            <div className="absolute inset-2 rounded-full border border-indigo-100/50 animate-[orbit_10s_linear_infinite]"></div>
            
            {/* Particules cosmiques */}
            <div className="absolute top-2 left-1/2 w-2 h-2 bg-indigo-400 rounded-full opacity-0 animate-[particle_3s_ease-in-out_infinite] shadow-lg shadow-indigo-400/50"></div>
            <div className="absolute top-1/3 right-4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 animate-[particle_4s_ease-in-out_infinite_0.7s] shadow-lg shadow-purple-400/50"></div>
            <div className="absolute bottom-1/3 left-4 w-1.5 h-1.5 bg-indigo-300 rounded-full opacity-0 animate-[particle_3.5s_ease-in-out_infinite_1.2s] shadow-lg shadow-indigo-300/50"></div>
            <div className="absolute bottom-6 right-1/3 w-1 h-1 bg-purple-300 rounded-full opacity-0 animate-[particle_4.5s_ease-in-out_infinite_1.8s]"></div>
            
            {/* Avatar central 3D */}
            <div className="absolute inset-4">
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-5xl shadow-2xl shadow-indigo-500/40 ring-4 ring-white/50 group-hover:scale-105 transition-transform duration-500 animate-[glow_3s_ease-in-out_infinite] backdrop-blur-sm overflow-hidden">
                {/* Effet glassmorphism */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-indigo-400/30 to-transparent"></div>
                
                {/* Lettre centrale */}
                <span className="relative z-10 drop-shadow-2xl tracking-wider">{user?.username?.charAt(0).toUpperCase()}</span>
                
                {/* Badge online sophistiqué */}
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full shadow-xl border-4 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">{user?.username}</h2>
            <p className="text-gray-600 text-lg flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-indigo-500" />
              {user?.email}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                En ligne maintenant
              </span>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          {!isEditing ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Nom d'utilisateur</p>
                  <p className="text-gray-900 font-medium">{user?.username}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900 font-medium">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Rôle</p>
                  <p className="text-gray-900 font-medium">{user?.role}</p>
                </div>
              </div>

              <Button variant="primary" onClick={() => setIsEditing(true)}>
                Modifier le profil
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Nom d'utilisateur"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />

              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <div className="flex gap-2">
                <Button type="submit" variant="primary" isLoading={isLoading}>
                  Enregistrer
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setIsEditing(false)
                    setFormData({
                      username: user?.username || '',
                      email: user?.email || '',
                    })
                  }}
                >
                  Annuler
                </Button>
              </div>
            </form>
          )}
        </div>
      </Card>

      {/* Stats Card */}
      <Card>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Statistiques du compte</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary-600">-</p>
            <p className="text-sm text-gray-600">Livres lus</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary-600">-</p>
            <p className="text-sm text-gray-600">Critiques</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary-600">-</p>
            <p className="text-sm text-gray-600">Listes</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
