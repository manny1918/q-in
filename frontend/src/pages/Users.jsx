import React from 'react';

const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/40?img=1',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Editor',
    status: 'Inactive',
    avatar: 'https://i.pravatar.cc/40?img=2',
  },
  // Add more sample users
];

export default function Users() {
  return (
    <div className="user-page-container">
      <div className="user-page-header">
        <h1>User Management</h1>
        <button className="btn">+ Add User</button>
      </div>

      <input
        type="text"
        placeholder="Search users..."
        className="user-search-input"
      />

      <table className="user-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <div className="user-info">
                  <img src={user.avatar} alt={user.name} className="avatar" />
                  {user.name}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <span className={`status-badge ${user.status.toLowerCase()}`}>
                  {user.status}
                </span>
              </td>
              <td style={{ textAlign: 'right' }}>
                <button className="btn-sm">Edit</button>
                <button className="btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
