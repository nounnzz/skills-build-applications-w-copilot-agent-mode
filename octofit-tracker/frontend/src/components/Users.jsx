import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../lib/api.js';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        if (!response.ok) throw new Error('Unable to fetch users');
        const payload = await response.json();
        const records = Array.isArray(payload?.users) ? payload.users : Array.isArray(payload) ? payload : [];
        setUsers(records);
      } catch (err) {
        setError(err.message || 'Unable to load users');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <section className="card bg-secondary-subtle text-dark shadow-sm">
      <div className="card-body">
        <h2 className="h4 fw-bold">Users</h2>
        {loading && <p className="text-muted">Loading users…</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <ul className="list-group list-group-flush mt-3">
            {users.map((user) => (
              <li key={user._id || user.id || `${user.name}-${user.email}`} className="list-group-item bg-transparent px-0">
                <strong>{user.name}</strong> — {user.role} · {user.fitnessGoal}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Users;
