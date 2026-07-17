import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../lib/api.js';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
        if (!response.ok) throw new Error('Unable to fetch teams');
        const payload = await response.json();
        const records = Array.isArray(payload?.teams) ? payload.teams : Array.isArray(payload) ? payload : [];
        setTeams(records);
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  return (
    <section className="card bg-secondary-subtle text-dark shadow-sm">
      <div className="card-body">
        <h2 className="h4 fw-bold">Teams</h2>
        {loading && <p className="text-muted">Loading teams…</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <ul className="list-group list-group-flush mt-3">
            {teams.map((team) => (
              <li key={team._id || team.id || team.name} className="list-group-item bg-transparent px-0">
                <strong>{team.name}</strong> — {team.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Teams;
