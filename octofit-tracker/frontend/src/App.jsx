import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  const envNote = import.meta.env.VITE_CODESPACE_NAME
    ? `Using Codespaces API URL for ${import.meta.env.VITE_CODESPACE_NAME}`
    : 'VITE_CODESPACE_NAME is not set; using localhost fallback.'

  return (
    <main className="min-vh-100 bg-dark text-light py-4">
      <section className="container">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-4 gap-3">
          <div>
            <p className="text-uppercase text-info fw-semibold mb-1">OctoFit Tracker</p>
            <h1 className="display-5 fw-bold mb-2">Modern fitness tracking for teams and individuals.</h1>
            <p className="lead text-secondary mb-0">
              Explore users, teams, activities, leadership rankings, and workout plans from the API tier.
            </p>
          </div>
          <div className="text-muted small">{envNote}</div>
        </div>

        <nav className="nav nav-pills flex-wrap gap-2 mb-4">
          <NavLink className="nav-link btn btn-outline-light" to="/">Home</NavLink>
          <NavLink className="nav-link btn btn-outline-light" to="/users">Users</NavLink>
          <NavLink className="nav-link btn btn-outline-light" to="/teams">Teams</NavLink>
          <NavLink className="nav-link btn btn-outline-light" to="/activities">Activities</NavLink>
          <NavLink className="nav-link btn btn-outline-light" to="/leaderboard">Leaderboard</NavLink>
          <NavLink className="nav-link btn btn-outline-light" to="/workouts">Workouts</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<section className="card bg-secondary-subtle text-dark p-4"><h2 className="h4">Welcome</h2><p>Choose a section to view live data from the OctoFit API.</p></section>} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </section>
    </main>
  )
}

export default App
