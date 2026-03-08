import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { authService } from '@/services/authService'
import { useAuthStore } from '@/stores/authStore'

export default function Register() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (formData.username.length < 3) {
      newErrors.username = 'Le nom doit contenir au moins 3 caractères'
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide'
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const { username, email, password } = formData
      const response = await authService.register({ username, email, password })
      setAuth(response.user, response.token)
      toast.success('Compte créé avec succès!')
      navigate('/')
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erreur lors de l\'inscription'
      toast.error(message)
      setErrors({ general: message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
      {/* Background image réel - Bibliothèque */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1920&q=80" 
          alt="Books background"
          className="w-full h-full object-cover"
        />
        {/* Overlay lumineux et élégant */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/75 via-indigo-50/80 to-purple-100/75"></div>
      </div>
      
      {/* Lumières ambiantes subtiles */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-indigo-400/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-400/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/2 w-64 h-64 bg-blue-400/6 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-md w-full relative z-20 animate-scale-in">
        <div className="text-center mb-8">
          {/* Logo moderne */}
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-indigo-500 rounded-2xl blur-lg opacity-20"></div>
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-2">
            BookTracker
          </h1>
          <p className="text-gray-700 font-medium text-lg">Créez votre compte gratuitement</p>
        </div>

        {/* Card moderne et claire */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Rejoignez-nous</h2>
          <p className="text-gray-600 mb-8">Commencez votre aventure littéraire</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Nom d'utilisateur"
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="votre-pseudo"
              required
              error={errors.username}
            />

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="vous@exemple.com"
              required
              error={errors.email}
            />

            <Input
              label="Mot de passe"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              required
              error={errors.password}
            />

            <Input
              label="Confirmer le mot de passe"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="••••••••"
              required
              error={errors.confirmPassword}
            />

            {errors.general && (
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl animate-fade-in">
                <p className="text-sm text-red-600 font-medium">{errors.general}</p>
              </div>
            )}

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full text-lg py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xl" 
              isLoading={isLoading}
            >
              Créer mon compte
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Déjà un compte ?{' '}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-bold">
                Se connecter
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-700 font-medium">
            Projet PFA - Mars 2026
          </p>
          <p className="text-xs text-gray-600 mt-1">
            <span className="text-indigo-600 font-semibold">Mohamed Nacer Hammami</span> & <span className="text-indigo-600 font-semibold">Dhia Ben Saidane</span>
          </p>
        </div>
      </div>
    </div>
  )
}
