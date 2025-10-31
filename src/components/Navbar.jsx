import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'
import './navbar.css'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="nav">
      <div className="nav-left">
        <Link className="brand" to={isAuthenticated ? '/dashboard' : '/'}>
          My Dashboard
        </Link>
        {isAuthenticated && (
          <nav className="links">
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
              Dashboard
            </NavLink>
            <NavLink to="/vendors" className={({ isActive }) => (isActive ? 'active' : '')}>
              Vendors
            </NavLink>
          </nav>
        )}
      </div>
      <div className="nav-right">
        {isAuthenticated ? (
          <>
            <span className="user">{user?.name}</span>
            <button className="btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link className="btn" to="/login">Login</Link>
        )}
      </div>
    </header>
  )
}


