import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../lib/api.js';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`);
        if (!response.ok) throw new Error('Unable to fetch workouts');
        const payload = await response.json();
        const records = Array.isArray(payload?.workouts) ? payload.workouts : Array.isArray(payload) ? payload : [];
        setWorkouts(records);
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section className="card bg-secondary-subtle text-dark shadow-sm">
      <div className="card-body">
        <h2 className="h4 fw-bold">Workouts</h2>
        {loading && <p className="text-muted">Loading workouts…</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <ul className="list-group list-group-flush mt-3">
            {workouts.map((workout) => (
              <li key={workout._id || workout.id || workout.name} className="list-group-item bg-transparent px-0">
                <strong>{workout.name}</strong> — {workout.difficulty} · {workout.focusArea}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Workouts;
