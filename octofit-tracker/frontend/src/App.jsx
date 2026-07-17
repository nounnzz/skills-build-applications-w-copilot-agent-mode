import './App.css'

function App() {
  return (
    <main className="min-vh-100 bg-dark text-light d-flex align-items-center">
      <section className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-7">
            <p className="text-uppercase text-info fw-semibold">OctoFit Tracker</p>
            <h1 className="display-4 fw-bold mb-3">Modern fitness tracking for teams and individuals.</h1>
            <p className="lead text-secondary mb-4">
              Log workouts, manage teams, and watch your progress climb on a polished multi-tier experience.
            </p>
            <div className="d-flex gap-3">
              <a className="btn btn-info btn-lg" href="/">Explore app</a>
              <a className="btn btn-outline-light btn-lg" href="/">View leaderboard</a>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="card bg-secondary-subtle text-dark shadow-lg">
              <div className="card-body p-4">
                <h2 className="h4 fw-bold">What’s ready</h2>
                <ul className="mb-0 mt-3">
                  <li>React 19 + Vite frontend</li>
                  <li>Express + TypeScript backend</li>
                  <li>MongoDB-ready Mongoose setup</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
