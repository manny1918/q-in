import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset, getServices } from '../features/service/serviceSlice';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { toast } from 'react-toastify';

export default function Services() {
    const dispatch = useDispatch();
    const { services, isLoading, isError, message } = useSelector((state) => state.service);

    useEffect(() => {
        dispatch(getServices());

        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
    }, [isError, message]);

    const onDelete = async (serviceId) => {
        if (!window.confirm('Are you sure you want to delete this service?')) return;

        try {
            // You need to implement deleteService in your slice
            await dispatch(deleteService(serviceId)).unwrap();
            toast.success('Service deleted');
            dispatch(getServices());
        } catch (err) {
            toast.error(err?.message || 'Failed to delete service');
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <BackButton url="/" />
            <div className="user-page-container">
                <div className="user-page-header">
                    <h1>Service Management</h1>
                    <Link className="btn" to="/services/create">+ Add Service</Link>
                </div>

                <input
                    type="text"
                    placeholder="Search services..."
                    className="user-search-input"
                />

                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(Array.isArray(services) ? services : []).map(service => (
                            <tr key={service._id}>
                                <td>{service.serviceName}</td>
                                <td>{service.description || 'No description'}</td>
                                <td>{service.active ? 'Active' : 'Inactive'}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <Link to={`/services/${service._id}`} className="btn-sm">View</Link>
                                    <Link to={`/services/edit/${service._id}`} className="btn-sm">Edit</Link>
                                    <Link className="btn-sm" style={{ color: 'red' }} onClick={() => onDelete(service._id)}>Delete</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
