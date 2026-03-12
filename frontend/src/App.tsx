import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from '@/stores/authStore'

// Pages
import Landing from '@/pages/Landing'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Layout from '@/components/Layout'
import Dashboard from '@/pages/Dashboard'
import Catalog from '@/pages/Catalog'
import BookDetails from '@/pages/BookDetails'
import Library from '@/pages/Library'
import ReadingLists from '@/pages/ReadingLists'
import ReadingListDetail from '@/pages/ReadingListDetail'
import Recommendations from '@/pages/Recommendations'
import Statistics from '@/pages/Statistics'
import Profile from '@/pages/Profile'
import Technologies from '@/pages/Technologies'

// Protected Route wrapper
interface RouteWrapperProps {
  children: React.ReactNode
  isAuthenticated: boolean
}

function ProtectedRoute({ children, isAuthenticated }: RouteWrapperProps) {
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

// Public Route wrapper (redirect if authenticated)
function PublicRoute({ children, isAuthenticated }: RouteWrapperProps) {
  return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>
}

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <>
      <Routes>
        {/* Landing page */}
        <Route path="/welcome" element={<PublicRoute isAuthenticated={isAuthenticated}><Landing /></PublicRoute>} />
        
        {/* Public routes */}
        <Route path="/login" element={<PublicRoute isAuthenticated={isAuthenticated}><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute isAuthenticated={isAuthenticated}><Register /></PublicRoute>} />

        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Layout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="books/:id" element={<BookDetails />} />
          <Route path="library" element={<Library />} />
          <Route path="lists" element={<ReadingLists />} />
          <Route path="lists/:id" element={<ReadingListDetail />} />
          <Route path="recommendations" element={<Recommendations />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="technologies" element={<Technologies />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={isAuthenticated ? <Navigate to="/" replace /> : <Navigate to="/welcome" replace />} />
      </Routes>

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </>
  )
}

export default App
