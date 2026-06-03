import { useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

export default function AdminPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/');
  };

  return <AdminDashboard token="bypass" onLogout={handleLogout} />;
}


