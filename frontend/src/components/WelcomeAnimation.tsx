import { useEffect, useState } from 'react'
import { Sparkles, BookOpen, TrendingUp, Target } from 'lucide-react'

interface WelcomeAnimationProps {
  username: string
  onComplete: () => void
}

const inspiringQuotes = [
  "Chaque livre est une nouvelle aventure qui commence! 📚",
  "La lecture ouvre des portes vers l'infini! ✨",
  "Votre prochaine découverte vous attend! 🚀",
  "Les grands lecteurs deviennent de grandes personnes! 🌟",
  "Un livre ouvert est un cerveau qui parle! 💡"
]

export default function WelcomeAnimation({ username, onComplete }: WelcomeAnimationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const quote = inspiringQuotes[Math.floor(Math.random() * inspiringQuotes.length)]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onComplete, 500)
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Overlay avec blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/95 via-purple-900/95 to-pink-900/95 backdrop-blur-xl" />
      
      {/* Particules flottantes animées */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-[float_3s_ease-in-out_infinite]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.5 + 0.3
            }}
          />
        ))}
      </div>

      {/* Contenu principal */}
      <div
        className={`relative z-10 text-center transform transition-all duration-700 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Icône animée */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 animate-pulse" />
          <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-300 rounded-full shadow-2xl animate-[spin_3s_ease-in-out_infinite]">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Message de bienvenue */}
        <h1 className="text-6xl font-black text-white mb-4 animate-[slideUp_0.6s_ease-out]">
          Bienvenue, {username}! 🎉
        </h1>
        
        <p className="text-2xl text-white/90 font-medium mb-8 animate-[slideUp_0.6s_ease-out_0.1s_both]">
          {quote}
        </p>

        {/* Mini stats animées */}
        <div className="flex justify-center gap-6 animate-[slideUp_0.6s_ease-out_0.2s_both]">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-4 border border-white/20">
            <BookOpen className="w-6 h-6 text-yellow-300 mx-auto mb-2" />
            <p className="text-white/80 text-sm">Explorez le catalogue</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-4 border border-white/20">
            <Target className="w-6 h-6 text-pink-300 mx-auto mb-2" />
            <p className="text-white/80 text-sm">Atteignez vos objectifs</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-4 border border-white/20">
            <TrendingUp className="w-6 h-6 text-purple-300 mx-auto mb-2" />
            <p className="text-white/80 text-sm">Suivez vos progrès</p>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="mt-8 w-64 h-1 bg-white/20 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 animate-[shimmer_1.5s_ease-in-out_infinite]" 
               style={{ width: '100%' }} />
        </div>
      </div>

      {/* Cercles décoratifs animés */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-pink-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-purple-400/20 rounded-full blur-3xl animate-pulse animation-delay-4000" />
    </div>
  )
}
