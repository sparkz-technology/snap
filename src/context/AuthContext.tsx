import { getCurrentUser } from '@/lib/appwrite/api'
import { IContextType, IUser } from '@/types'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line react-refresh/only-export-components
export const INITIAL_USER = {
  id: '',
  name: '',
  username: '',
  email: '',
  imageUrl: '',
  bio: '',
}
const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
}
export const AuthContext = createContext<IContextType>(INITIAL_STATE)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState<IUser | null>(INITIAL_USER)
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const checkAuthUser = async () => {
    setIsLoading(true)
    try {
      const currentAccount = await getCurrentUser()
      if (currentAccount) {
        const { $id, name, username, email, imageUrl, bio } = currentAccount
        setUser({
          id: $id,
          name,
          username,
          email,
          imageUrl,
          bio,
        })
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (error) {
      console.error(error)
      return false
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (
      localStorage.getItem('cookieFallback') === 'true' ||
      localStorage.getItem('cookieFallback') === null
    ) {
      navigate('/sign-in')
    }
    checkAuthUser()
  }, [])
  const value = {
    user,
    isLoading,
    isAuthenticated,
    setUser,
    setIsLoading,
    setIsAuthenticated,
    checkAuthUser,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => useContext(AuthContext)
