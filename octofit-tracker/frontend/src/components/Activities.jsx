import { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch('https://nounnzz-8000.app.github.dev/api/activities/');
        if (!response.ok) {
          throw new Error('Unable to load activities');
        }
        const payload = await response.json();
        const list = Array.isArray(payload) ? payload : payload.activities ?? payload.results ?? [];
        setActivities(list);
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  return (
    <section className="card bg-dark-subtle p-4">
      <h2 className="h4 mb-3">Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ul className="list-group">
          {activities.map((activity) => (
            <li className="list-group-item" key={activity._id || activity.id || activity.type}>
              <strong>{activity.type}</strong> — {activity.durationMinutes} min on {activity.date}
              {activity.caloriesBurned ? ` • ${activity.caloriesBurned} kcal` : ''}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Activities;
