import { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch('https://nounnzz-8000.app.github.dev/api/workouts/');
        if (!response.ok) {
          throw new Error('Unable to load workouts');
        }
        const payload = await response.json();
        const list = Array.isArray(payload) ? payload : payload.workouts ?? payload.results ?? [];
        setWorkouts(list);
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section className="card bg-dark-subtle p-4">
      <h2 className="h4 mb-3">Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ul className="list-group">
          {workouts.map((workout) => (
            <li className="list-group-item" key={workout._id || workout.id || workout.name}>
              <strong>{workout.name}</strong> — {workout.difficulty} • {workout.focusArea}
              {workout.durationMinutes ? ` • ${workout.durationMinutes} min` : ''}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Workouts;
