import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../lib/api.js';

function Leaderboard() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`);
        if (!response.ok) throw new Error('Unable to fetch leaderboard');
        const payload = await response.json();
        const records = Array.isArray(payload?.leaderboard) ? payload.leaderboard : Array.isArray(payload) ? payload : [];
        setRows(records);
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section className="card bg-secondary-subtle text-dark shadow-sm">
      <div className="card-body">
        <h2 className="h4 fw-bold">Leaderboard</h2>
        {loading && <p className="text-muted">Loading leaderboard…</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <ul className="list-group list-group-flush mt-3">
            {rows.map((row) => (
              <li key={row._id || row.id || row.name} className="list-group-item bg-transparent px-0">
                <strong>{row.name}</strong> — {row.score} pts · streak {row.streak}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Leaderboard;
