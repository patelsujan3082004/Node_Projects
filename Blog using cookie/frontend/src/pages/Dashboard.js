import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalCategories: 0,
    recentBlogs: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [blogsRes, categoriesRes] = await Promise.all([
        api.get('/blogs'),
        api.get('/categories')
      ]);

      const blogs = blogsRes.data.blogs || [];
      const categories = categoriesRes.data.categories || [];

      setStats({
        totalBlogs: blogs.length,
        totalCategories: categories.length,
        recentBlogs: blogs.slice(0, 5)
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="App">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <div className="spinner-container">Loading dashboard…</div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <Navbar />

        <div className="dashboard-wrapper">
          {/* Header */}
          <div className="dashboard-top">
            <h2>Dashboard</h2>
            <p>Overview of your blog platform</p>
          </div>

          {/* Stats */}
          <div className="stats-layout">
            <div className="stat-modern blue">
              <span className="icon">📝</span>
              <div>
                <h3>{stats.totalBlogs}</h3>
                <p>Total Blogs</p>
              </div>
            </div>

            <div className="stat-modern green">
              <span className="icon">📁</span>
              <div>
                <h3>{stats.totalCategories}</h3>
                <p>Categories</p>
              </div>
            </div>
          </div>

          {/* Recent Blogs */}
          <div className="recent-layout">
            <h4>Recent Blogs</h4>

            {stats.recentBlogs.length === 0 ? (
              <p className="text-muted">No blogs created yet</p>
            ) : (
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentBlogs.map(blog => (
                    <tr key={blog._id}>
                      <td>{blog.title}</td>
                      <td>
                        <span className="category-pill">
                          {blog.category?.name || 'Uncategorized'}
                        </span>
                      </td>
                      <td>{blog.author}</td>
                      <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
