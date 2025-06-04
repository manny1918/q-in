import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reset, getUsers, deleteUser } from '../features/user/userSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { toast } from 'react-toastify';

export default function Users() {
    const dispatch = useDispatch();
    const { users, isLoading, isError, message } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUsers());

        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
    }, [isError, message]);

    const onDelete = async (userId) => {
        try {
            await dispatch(deleteUser(userId)).unwrap();
            toast.success('User deleted');
            dispatch(getUsers()); // Re-fetch users
        } catch (err) {
            toast.error(err?.message || 'Failed to delete user');
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="user-page-container">
            <div className="user-page-header">
                <h1>User Management</h1>
                <Link className="btn" to='/register'>+ Add User</Link>
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
                        <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(Array.isArray(users) ? users : []).map(user => (
                        <tr key={user._id}>
                            <td>
                                <div className="user-info">{user.name}</div>
                            </td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                            <td style={{ textAlign: 'right' }}>
                                <Link to={`/users/${user._id}`} className="btn-sm">View</Link>
                                <button className="btn-sm">Edit</button>
                                <button className="btn-sm btn-danger" onClick={() => onDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
