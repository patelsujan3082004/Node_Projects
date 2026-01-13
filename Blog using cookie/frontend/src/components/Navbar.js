import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const Navbar = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await api.get('/auth/me');
        setAdmin(response.data.admin);
      } catch (error) {
        console.error('Error fetching admin:', error);
      }
    };

    fetchAdmin();
  }, []);

  const getInitials = (name) => {
    if (!name) return 'A';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="navbar-custom">
      <div>
        <h4 style={{ margin: 0, color: '#2c3e50' }}>Admin Panel</h4>
      </div>
      <div className="admin-info">
        <span className="admin-name">{admin?.name || 'Admin'}</span>
        <div className="profile-icon">
          {getInitials(admin?.name)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

