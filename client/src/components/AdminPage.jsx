import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import api from '../api';
import styles from './Admin.module.css';

export default function AdminPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await api.post('/api/admin/login', { password });
      localStorage.setItem('admin_token', res.data.token);
      setToken(res.data.token);
    } catch {
      setError('Wrong password');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
    navigate('/');
  };

  if (!token) return (
    <div className={styles.loginWrap}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoFocus
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );

  return <AdminDashboard token={token} onLogout={handleLogout} />;
}
