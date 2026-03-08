import { useNavigate } from 'react-router-dom'
import { BookOpen, TrendingUp, BarChart3, Users, Star, Sparkles } from 'lucide-react'
import Button from '@/components/Button'

export default function Landing() {
  const navigate = useNavigate()

  const features = [
    {
      icon: BookOpen,
      title: 'Catalogue Complet',
      description: 'Découvrez une large collection de livres avec images et détails',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: TrendingUp,
      title: 'Recommandations IA',
      description: 'Algorithme intelligent basé sur vos préférences de lecture',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: BarChart3,
      title: 'Statistiques Avancées',
      description: 'Suivez votre progression avec des graphiques interactifs',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Listes Personnalisées',
      description: 'Organisez vos lectures par listes thématiques',
      gradient: 'from-orange-500 to-red-500'
    }
  ]

  const stats = [
    { value: '20+', label: 'Livres disponibles' },
    { value: '100%', label: 'Gratuit' },
    { value: '⚡', label: 'Rapide & Moderne' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary-600 to-purple-600 p-2 rounded-xl shadow-lg">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                BookTracker
              </h1>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => navigate('/login')}>
                Connexion
              </Button>
              <Button variant="primary" onClick={() => navigate('/register')}>
                Commencer
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-100 to-purple-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-8">
              <Sparkles className="w-4 h-4" />
              Projet PFA - Mars 2026
            </div>
            
            <h2 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-primary-800 to-purple-900 bg-clip-text text-transparent">
                Suivez vos lectures
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                avec intelligence
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              BookTracker est votre compagnon de lecture intelligent. Gérez votre bibliothèque, 
              découvrez de nouveaux livres grâce à notre système de recommandations, 
              et suivez vos statistiques de lecture en temps réel.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                variant="primary" 
                onClick={() => navigate('/register')}
                className="text-lg px-8 py-4 shadow-2xl shadow-primary-500/50"
              >
                <Star className="w-5 h-5 mr-2" />
                Commencer gratuitement
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="text-lg px-8 py-4"
              >
                Se connecter
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-20">
              {stats.map((stat, index) => (
                <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="animate-scale-in bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à transformer votre expérience de lecture ?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Rejoignez BookTracker dès maintenant et découvrez une nouvelle façon de gérer vos livres.
          </p>
          <Button 
            variant="secondary" 
            onClick={() => navigate('/register')}
            className="bg-white text-primary-600 hover:bg-gray-50 text-lg px-8 py-4 shadow-2xl"
          >
            Créer mon compte gratuitement
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            © 2026 BookTracker - Projet de Fin d'Année
          </p>
          <p className="text-xs mt-2 text-gray-500">
            Réalisé par <span className="text-primary-400 font-medium">Mohamed Nacer Hammami</span> & <span className="text-primary-400 font-medium">Dhia Ben Saidane</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
