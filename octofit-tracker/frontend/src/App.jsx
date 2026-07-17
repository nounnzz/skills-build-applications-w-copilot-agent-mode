import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  return (
    <main className="min-vh-100 bg-dark text-light py-5">
      <section className="container">
        <div className="row g-4 align-items-start">
          <div className="col-lg-4">
            <div className="card bg-secondary-subtle text-dark shadow-sm">
              <div className="card-body">
                <p className="text-uppercase text-info fw-semibold">OctoFit Tracker</p>
                <h1 className="h3 fw-bold">Modern fitness tracking for teams and individuals.</h1>
                <p className="text-muted mt-3">
                  Set VITE_CODESPACE_NAME in .env.local to point the UI at your Codespaces API URL. If it is unset, the app falls back to localhost.
                </p>
                <nav className="d-flex flex-column gap-2 mt-4">
                  <Link className="btn btn-outline-dark" to="/">Home</Link>
                  <Link className="btn btn-outline-dark" to="/users">Users</Link>
                  <Link className="btn btn-outline-dark" to="/teams">Teams</Link>
                  <Link className="btn btn-outline-dark" to="/activities">Activities</Link>
                  <Link className="btn btn-outline-dark" to="/leaderboard">Leaderboard</Link>
                  <Link className="btn btn-outline-dark" to="/workouts">Workouts</Link>
                </nav>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <Routes>
              <Route path="/" element={<div className="card bg-secondary-subtle text-dark shadow-sm"><div className="card-body"><h2 className="h4 fw-bold">Welcome</h2><p className="mb-0">Choose a section from the navigation to view data from the multi-tier OctoFit API.</p></div></div>} />
              <Route path="/users" element={<Users />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/workouts" element={<Workouts />} />
            </Routes>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
