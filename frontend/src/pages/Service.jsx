import { useSelector, useDispatch } from "react-redux";
import { reset, getService } from '../features/service/serviceSlice';
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { FaClock } from 'react-icons/fa';

export default function Service() {
    const { service, isLoading, isError, message } = useSelector((state) => state.service);

    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getService(params.serviceId));

        return () => {
            dispatch(reset());
        };
    }, [dispatch, params.serviceId]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
    }, [isError, message]);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError || !service) {
        return <h3>Something went wrong</h3>;
    }

    return (
        <>
            <section className="heading">
                <BackButton url='/services' />
                <h1><FaClock /> View Service</h1>
                <p>View service details</p>
            </section>

            <section className="form">
                <form>
                    <div className="form-group">
                        <label>Service Name</label>
                        <input
                            type="text"
                            value={service.serviceName || ''}
                            className="form-control"
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label>Service Description</label>
                        <input
                            type="text"
                            value={service.description || ''}
                            className="form-control"
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <input
                            type="text"
                            value={service.active ? 'Active' : 'Inactive'}
                            className="form-control"
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label>Created At</label>
                        <input
                            type="text"
                            value={new Date(service.createdAt).toLocaleString()}
                            className="form-control"
                            disabled
                        />
                    </div>

                    {service.updatedAt && (
                        <div className="form-group">
                            <label>Last Updated</label>
                            <input
                                type="text"
                                value={new Date(service.updatedAt).toLocaleString()}
                                className="form-control"
                                disabled
                            />
                        </div>
                    )}
                </form>
            </section>
        </>
    );
}
