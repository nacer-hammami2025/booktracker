import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, TrendingUp, BarChart3, Users, Star, Sparkles, Zap, Shield, Code2 } from 'lucide-react'
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
    { value: '2000+', label: 'Pages de lecture', icon: BookOpen },
    { value: 'Java 21', label: 'LTS & Moderne', icon: Zap },
    { value: '5', label: 'Microservices', icon: Code2 }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

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
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-20 right-10 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          />
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute bottom-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-100 to-purple-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-8 shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              Architecture Microservices Professionnelle
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-gray-900 via-primary-800 to-purple-900 bg-clip-text text-transparent">
                Suivez vos lectures
              </span>
              <br />
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              >
                avec intelligence
              </motion.span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Gérez votre bibliothèque, découvrez de nouveaux livres avec notre IA de recommandations, 
              et analysez vos statistiques de lecture. Construit avec <strong>Java 21</strong>, <strong>Spring Boot 3</strong> et <strong>React 18</strong>.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="primary" 
                  onClick={() => navigate('/register')}
                  className="text-lg px-8 py-4 shadow-2xl shadow-primary-500/50 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Commencer gratuitement
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-700 to-purple-700"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/login')}
                  className="text-lg px-8 py-4"
                >
                  Se connecter
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats with icons */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-20"
            >
              {stats.map((stat) => (
                <motion.div 
                  key={stat.label} 
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all">
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary-600 group-hover:scale-110 transition-transform" />
                    <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Features Grid with motion */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                />
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Showcase Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 text-gray-900"
          >
            Technologies de Pointe
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            Architecture microservices avec les dernières versions des frameworks les plus populaires
          </motion.p>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { name: 'Java 21 LTS', icon: '☕', color: 'from-orange-500 to-red-500' },
              { name: 'Spring Boot 3', icon: '🍃', color: 'from-green-500 to-emerald-500' },
              { name: 'React 18', icon: '⚛️', color: 'from-blue-500 to-cyan-500' },
              { name: 'PostgreSQL 16', icon: '🐘', color: 'from-indigo-500 to-purple-500' },
            ].map((tech) => (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="text-5xl mb-3">{tech.icon}</div>
                <div className={`text-lg font-bold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}>
                  {tech.name}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Button
              variant="outline"
              onClick={() => navigate('/technologies')}
              className="text-lg px-8 py-3"
            >
              <Code2 className="w-5 h-5 mr-2" />
              Découvrir l'architecture complète
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 relative overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold mb-6"
          >
            <Shield className="w-4 h-4" />
            Gratuit • Sans engagement • Sécurisé
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Prêt à transformer votre expérience de lecture ?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Rejoignez BookTracker dès maintenant et découvrez une nouvelle façon de gérer vos livres 
            avec une application moderne construite avec les meilleures technologies.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="secondary" 
              onClick={() => navigate('/register')}
              className="bg-white text-primary-600 hover:bg-gray-50 text-lg px-8 py-4 shadow-2xl"
            >
              <Zap className="w-5 h-5 mr-2" />
              Créer mon compte gratuitement
            </Button>
          </motion.div>
        </div>
      </motion.section>

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
