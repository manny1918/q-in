import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reset, getUsers } from '../features/user/userSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import ServiceItem from './ServiceItem'


export default function Users() {
    const { users, isLoading, isError, isSuccess, message } = useSelector((state) => state.user)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    if (isLoading) {
        return <Spinner />
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
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>
                                <div className="user-info">
                                    {user.name}
                                </div>
                            </td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? 'Admin' : 'User'}</td>
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
