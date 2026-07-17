import { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch('https://nounnzz-8000.app.github.dev/api/teams/');
        if (!response.ok) {
          throw new Error('Unable to load teams');
        }
        const payload = await response.json();
        const list = Array.isArray(payload) ? payload : payload.teams ?? payload.results ?? [];
        setTeams(list);
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  return (
    <section className="card bg-dark-subtle p-4">
      <h2 className="h4 mb-3">Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ul className="list-group">
          {teams.map((team) => (
            <li className="list-group-item" key={team._id || team.id || team.name}>
              <strong>{team.name}</strong> — {team.description || 'Team'}
              {Array.isArray(team.members) ? ` • ${team.members.length} members` : ''}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Teams;
