import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '@/components/Button'
import Input from '@/components/Input'
import WelcomeAnimation from '@/components/WelcomeAnimation'
import { authService } from '@/services/authService'
import { useAuthStore } from '@/stores/authStore'

export default function Login() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [welcomeUsername, setWelcomeUsername] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setIsLoading(true)

    try {
      const response = await authService.login(formData)
      setAuth(response.user, response.token)
      setWelcomeUsername(response.user.username)
      setShowWelcome(true)
    } catch (error: any) {
      const message = error.response?.data?.message || 'Identifiants invalides'
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
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&q=80" 
          alt="Library background"
          className="w-full h-full object-cover"
        />
        {/* Overlay lumineux et élégant */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/75 via-blue-50/80 to-indigo-100/75"></div>
      </div>
      
      {/* Lumières ambiantes subtiles */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-400/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-400/6 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-md w-full relative z-20 animate-scale-in">
        <div className="text-center mb-8">
          {/* Logo moderne */}
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-lg opacity-20"></div>
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-black text-gray-900 dark:text-gray-100 mb-2">
            BookTracker
          </h1>
          <p className="text-gray-700 dark:text-gray-300 font-medium text-lg">Suivez vos lectures avec passion</p>
        </div>

        {/* Card moderne et claire */}
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 dark:border-gray-700/50">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Bienvenue !</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Connectez-vous à votre compte</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Input
                label="Nom d'utilisateur"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="votre-pseudo"
                required
                error={errors.username}
              />
            </div>

            <div>
              <Input
                label="Mot de passe"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                required
                error={errors.password}
              />
            </div>

            {errors.general && (
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl animate-fade-in">
                <p className="text-sm text-red-600 font-medium">{errors.general}</p>
              </div>
            )}

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full text-lg py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl" 
              isLoading={isLoading}
            >
              Se connecter
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Pas encore de compte ?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 font-bold">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-700 font-medium">
            Projet PFA - Mars 2026
          </p>
          <p className="text-xs text-gray-600 mt-1">
            <span className="text-blue-600 font-semibold">Mohamed Nacer Hammami</span> & <span className="text-blue-600 font-semibold">Dhia Ben Saidane</span>
          </p>
        </div>
      </div>

      {/* Animation de bienvenue spectaculaire */}
      {showWelcome && (
        <WelcomeAnimation
          username={welcomeUsername}
          onComplete={() => navigate('/')}
        />
      )}
    </div>
  )
}
