import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../lib/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        if (!response.ok) {
          throw new Error('Unable to load users');
        }
        const payload = await response.json();
        const list = Array.isArray(payload) ? payload : payload.users ?? payload.results ?? [];
        setUsers(list);
      } catch (err) {
        setError(err.message || 'Unable to load users');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <section className="card bg-dark-subtle p-4">
      <h2 className="h4 mb-3">Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ul className="list-group">
          {users.map((user) => (
            <li className="list-group-item" key={user._id || user.id || user.name}>
              <strong>{user.name}</strong> — {user.role || user.fitnessGoal || 'Member'}
              {user.email ? ` • ${user.email}` : ''}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Users;
