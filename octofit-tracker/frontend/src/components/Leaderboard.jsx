import { useEffect, useState } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch('https://nounnzz-8000.app.github.dev/api/leaderboard/');
        if (!response.ok) {
          throw new Error('Unable to load leaderboard');
        }
        const payload = await response.json();
        const list = Array.isArray(payload) ? payload : payload.leaderboard ?? payload.results ?? [];
        setEntries(list);
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section className="card bg-dark-subtle p-4">
      <h2 className="h4 mb-3">Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ol className="list-group list-group-numbered">
          {entries.map((entry) => (
            <li className="list-group-item" key={entry._id || entry.id || entry.name}>
              <strong>{entry.name}</strong> — {entry.score} pts • streak {entry.streak}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default Leaderboard;
