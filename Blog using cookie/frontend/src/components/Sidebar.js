import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/blogs/add', icon: '➕', label: 'Add Blog' },
    { path: '/blogs', icon: '📝', label: 'All Blogs' },
    { path: '/categories', icon: '📁', label: 'Categories' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Blog Admin</h3>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
        <li>
          <a
            href="#logout"
            onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem('token');
              localStorage.removeItem('admin');
              window.location.href = '/login';
            }}
          >
            <span>🚪</span>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

