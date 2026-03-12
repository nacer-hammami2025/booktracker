import { Outlet, NavLink } from 'react-router-dom'
import { BookOpen, Library, List, TrendingUp, BarChart3, LogOut, Code2 } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import ThemeToggle from './ThemeToggle'

export default function Layout() {
  const { user, clearAuth } = useAuthStore()

  const navigation = [
    { name: 'Tableau de bord', to: '/', icon: BarChart3 },
    { name: 'Catalogue', to: '/catalog', icon: BookOpen },
    { name: 'Ma Bibliothèque', to: '/library', icon: Library },
    { name: 'Mes Listes', to: '/lists', icon: List },
    { name: 'Recommandations', to: '/recommendations', icon: TrendingUp },
    { name: 'Statistiques', to: '/statistics', icon: BarChart3 },
    { name: 'Technologies', to: '/technologies', icon: Code2 },
  ]

  const handleLogout = () => {
    clearAuth()
    globalThis.location.href = '/login'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Header avec design premium */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 py-3">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary-600 to-purple-600 p-2 rounded-xl shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  BookTracker
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Votre compagnon de lecture</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <NavLink
                to="/profile"
                className="group flex items-center gap-3 px-4 py-2.5 rounded-2xl hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30 transition-all duration-500"
              >
                <div className="relative w-14 h-14">
                  {/* Orbites animées */}
                  <div className="absolute inset-0 rounded-full border-2 border-indigo-200/30 animate-[orbit_15s_linear_infinite]"></div>
                  <div className="absolute inset-0 rounded-full border-2 border-purple-200/20 animate-[orbitReverse_20s_linear_infinite]"></div>
                  
                  {/* Particules flottantes */}
                  <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-0 animate-[particle_3s_ease-in-out_infinite]"></div>
                  <div className="absolute top-1/4 right-0 w-1 h-1 bg-purple-400 rounded-full opacity-0 animate-[particle_4s_ease-in-out_infinite_0.5s]"></div>
                  <div className="absolute bottom-1/4 left-0 w-1 h-1 bg-indigo-300 rounded-full opacity-0 animate-[particle_3.5s_ease-in-out_infinite_1s]"></div>
                  
                  {/* Avatar central avec effet 3D */}
                  <div className="absolute inset-2">
                    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-2xl group-hover:shadow-indigo-500/50 transition-all duration-500 group-hover:scale-110 animate-[glow_3s_ease-in-out_infinite] backdrop-blur-sm">
                      {/* Effet glassmorphism interne */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                      <span className="relative z-10 drop-shadow-2xl tracking-wide">{user?.username?.charAt(0).toUpperCase()}</span>
                      
                      {/* Badge online élégant */}
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full shadow-lg border-2 border-white animate-pulse">
                        <div className="absolute inset-0.5 bg-emerald-300 rounded-full animate-ping"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 transition-colors duration-300">{user?.username}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-purple-600 transition-colors duration-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>{' '}
                    En ligne
                  </span>
                </div>
              </NavLink>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-all font-medium"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation moderne */}
      <nav className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 sticky top-18 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-2 overflow-x-auto py-2">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg shadow-primary-500/30'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-50 via-white to-gray-50 border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600 font-medium">
            © 2026 BookTracker - Projet de Fin d'Année
          </p>
          <p className="text-center text-xs mt-2 text-gray-500">
            Réalisé par <span className="text-primary-600 font-semibold">Mohamed Nacer Hammami</span> & <span className="text-primary-600 font-semibold">Dhia Ben Saidane</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
