import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';

export default function AdminPage() {
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '');
  const [loading, setLoading] = useState(!token);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) return;

    const autoLogin = async () => {
      try {
        const { data } = await axios.post('/api/admin/login', { password: '' });
        localStorage.setItem('admin_token', data.token);
        setToken(data.token);
      } catch (err) {
        console.error('Auto login failed:', err);
        setError('Failed to authenticate admin session.');
      } finally {
        setLoading(false);
      }
    };

    autoLogin();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken('');
    navigate('/');
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#0A0A0B',
        color: '#f3f4f6',
        fontFamily: 'sans-serif'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(167, 139, 250, 0.1)',
          borderTopColor: '#a78bfa',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ marginTop: '1.5rem', fontSize: '0.95rem', color: '#9ca3af' }}>Entering CMS Admin Panel...</p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#0A0A0B',
        color: '#ef4444',
        padding: '2rem',
        textAlign: 'center',
        fontFamily: 'sans-serif'
      }}>
        <h2>Authentication Failed</h2>
        <p style={{ color: '#9ca3af', marginTop: '0.5rem', marginBottom: '2rem' }}>{error}</p>
        <button 
          onClick={() => navigate('/')} 
          style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#fff', cursor: 'pointer' }}
        >
          Return to Home
        </button>
      </div>
    );
  }

  return <AdminDashboard token={token} onLogout={handleLogout} />;
}


