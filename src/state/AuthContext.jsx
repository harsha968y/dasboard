import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const AUTH_STORAGE_KEY = 'app.auth.user'

const HARDCODED_USER = {
  email: 'user@example.com',
  name: 'Demo User',
}
const HARDCODED_PASSWORD = 'password123'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        setUser(parsed)
      } catch {
        // ignore invalid stored data
        localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    }
  }, [])

  const login = (email, password) => {
    if (email === HARDCODED_USER.email && password === HARDCODED_PASSWORD) {
      setUser(HARDCODED_USER)
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(HARDCODED_USER))
      return { ok: true }
    }
    return { ok: false, error: 'Invalid credentials' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  const value = useMemo(() => ({ user, isAuthenticated: !!user, login, logout }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


