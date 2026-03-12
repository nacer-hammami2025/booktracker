import { motion } from 'framer-motion'
import { 
  Code2, Database, Cloud, Shield, Zap, GitBranch,
  Server, Cpu, Network, Lock, BarChart3, Box
} from 'lucide-react'

export default function Technologies() {
  const techStack = [
    {
      category: 'Backend',
      icon: Server,
      gradient: 'from-blue-600 to-cyan-600',
      technologies: [
        { name: 'Java 21 LTS', icon: '☕', description: 'Latest LTS version avec Virtual Threads' },
        { name: 'Spring Boot 3.2.3', icon: '🍃', description: 'Framework microservices moderne' },
        { name: 'Spring Cloud Gateway', icon: '🌐', description: 'API Gateway intelligent' },
        { name: 'Spring Security 6', icon: '🔐', description: 'Sécurité renforcée JWT' },
      ]
    },
    {
      category: 'Frontend',
      icon: Code2,
      gradient: 'from-purple-600 to-pink-600',
      technologies: [
        { name: 'React 18', icon: '⚛️', description: 'UI library avec hooks modernes' },
        { name: 'TypeScript', icon: '📘', description: 'Type safety & IntelliSense' },
        { name: 'Tailwind CSS', icon: '🎨', description: 'Utility-first CSS framework' },
        { name: 'Framer Motion', icon: '✨', description: 'Animations fluides' },
      ]
    },
    {
      category: 'Base de données',
      icon: Database,
      gradient: 'from-emerald-600 to-green-600',
      technologies: [
        { name: 'PostgreSQL 16', icon: '🐘', description: '4 databases isolées (Database per Service)' },
        { name: 'Redis 7', icon: '⚡', description: 'Cache distribué pour recommandations' },
        { name: 'JPA/Hibernate', icon: '🔧', description: 'ORM moderne avec relations' },
      ]
    },
    {
      category: 'DevOps & Tools',
      icon: Cloud,
      gradient: 'from-orange-600 to-red-600',
      technologies: [
        { name: 'Docker', icon: '🐳', description: 'Conteneurisation 10 services' },
        { name: 'Docker Compose', icon: '📦', description: 'Orchestration multi-conteneurs' },
        { name: 'Maven', icon: '🔨', description: 'Build automation & dependencies' },
        { name: 'Vite', icon: '⚡', description: 'Build tool ultra-rapide' },
      ]
    },
  ]

  const architecture = {
    services: [
      { name: 'API Gateway', port: '8080', color: 'from-indigo-500 to-blue-500', icon: Network },
      { name: 'Auth Service', port: '8081', color: 'from-purple-500 to-pink-500', icon: Lock },
      { name: 'Book Service', port: '8082', color: 'from-green-500 to-emerald-500', icon: Server },
      { name: 'Tracker Service', port: '8083', color: 'from-yellow-500 to-orange-500', icon: BarChart3 },
      { name: 'Reco Service', port: '8084', color: 'from-red-500 to-rose-500', icon: Cpu },
    ],
    databases: [
      { name: 'Auth DB', port: '5432', color: 'bg-purple-500' },
      { name: 'Book DB', port: '5433', color: 'bg-green-500' },
      { name: 'Tracker DB', port: '5434', color: 'bg-orange-500' },
      { name: 'Reco DB', port: '5435', color: 'bg-red-500' },
    ]
  }

  const features = [
    {
      icon: Shield,
      title: 'Sécurité Renforcée',
      description: 'JWT Authentication, BCrypt, CORS, validation des données',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Redis cache, Virtual Threads Java 21, lazy loading, pagination',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: GitBranch,
      title: 'Architecture Modulaire',
      description: 'Microservices indépendants, Database per Service, scalabilité',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Box,
      title: 'Tests & Qualité',
      description: 'Tests unitaires JUnit 5, Mockito, >70% coverage',
      gradient: 'from-green-500 to-emerald-500'
    },
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
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-12 shadow-2xl"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold mb-6"
          >
            <Code2 className="w-4 h-4" />
            Stack Technique
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-black text-white mb-4"
          >
            Technologies & Architecture
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl"
          >
            BookTracker est construit avec les technologies les plus modernes et une architecture 
            microservices professionnelle pour garantir performance, scalabilité et maintenabilité.
          </motion.p>
        </div>
      </motion.div>

      {/* Architecture Diagram */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Network className="w-8 h-8 text-primary-600" />
          Architecture Microservices
        </h2>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-200 shadow-xl">
          {/* Frontend Layer */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1">React Frontend</h3>
                  <p className="text-purple-100">Port 3000 • 12 pages • 13 composants</p>
                </div>
                <Code2 className="w-12 h-12 opacity-80" />
              </div>
            </div>
          </motion.div>

          {/* Arrow */}
          <div className="flex justify-center mb-8">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-4xl text-gray-400"
            >
              ↓
            </motion.div>
          </div>

          {/* API Gateway */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1">API Gateway</h3>
                  <p className="text-indigo-100">Port 8080 • Routage • JWT Validation • CORS</p>
                </div>
                <Network className="w-12 h-12 opacity-80" />
              </div>
            </div>
          </motion.div>

          {/* Arrow */}
          <div className="flex justify-center mb-8">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              className="text-4xl text-gray-400"
            >
              ↓
            </motion.div>
          </div>

          {/* Microservices */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {architecture.services.slice(1).map((service) => (
              <motion.div
                key={service.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`bg-gradient-to-br ${service.color} rounded-xl p-5 text-white shadow-lg cursor-pointer`}
              >
                <service.icon className="w-10 h-10 mb-3 opacity-90" />
                <h4 className="font-bold text-lg mb-1">{service.name}</h4>
                <p className="text-sm opacity-90">Port {service.port}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Arrow */}
          <div className="flex justify-center mb-8">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 1 }}
              className="text-4xl text-gray-400"
            >
              ↓
            </motion.div>
          </div>

          {/* Databases */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {architecture.databases.map((db) => (
              <motion.div
                key={db.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className={`${db.color} rounded-xl p-5 text-white shadow-lg text-center cursor-pointer`}
              >
                <Database className="w-10 h-10 mx-auto mb-3 opacity-90" />
                <h4 className="font-bold mb-1">{db.name}</h4>
                <p className="text-sm opacity-90">:{db.port}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Redis */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-6 flex justify-center"
          >
            <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-4 text-white shadow-lg inline-flex items-center gap-3">
              <Zap className="w-8 h-8" />
              <div>
                <h4 className="font-bold">Redis Cache</h4>
                <p className="text-sm opacity-90">Port 6379 • Cache distribué</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <Code2 className="w-8 h-8 text-primary-600" />
          Stack Technologique
        </h2>

        {techStack.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`}>
                <category.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{category.category}</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {category.technologies.map((tech, techIndex) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: categoryIndex * 0.2 + techIndex * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <span className="text-3xl">{tech.icon}</span>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{tech.name}</h4>
                    <p className="text-sm text-gray-600">{tech.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Features */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Zap className="w-8 h-8 text-primary-600" />
          Caractéristiques Techniques
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-200"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="bg-gradient-to-br from-primary-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Statistiques du Projet</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '5', label: 'Microservices' },
            { value: '10', label: 'Conteneurs Docker' },
            { value: '4', label: 'Bases de données' },
            { value: '12', label: 'Pages React' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1, type: "spring" }}
              className="text-center"
            >
              <div className="text-5xl font-black mb-2">{stat.value}</div>
              <div className="text-primary-100 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
