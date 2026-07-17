import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../lib/api.js';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        if (!response.ok) throw new Error('Unable to fetch activities');
        const payload = await response.json();
        const records = Array.isArray(payload?.activities) ? payload.activities : Array.isArray(payload) ? payload : [];
        setActivities(records);
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  return (
    <section className="card bg-secondary-subtle text-dark shadow-sm">
      <div className="card-body">
        <h2 className="h4 fw-bold">Activities</h2>
        {loading && <p className="text-muted">Loading activities…</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <ul className="list-group list-group-flush mt-3">
            {activities.map((activity) => (
              <li key={activity._id || activity.id || `${activity.type}-${activity.date}`} className="list-group-item bg-transparent px-0">
                <strong>{activity.type}</strong> — {activity.durationMinutes} mins on {activity.date}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Activities;
