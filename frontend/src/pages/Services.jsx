import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reset, getServices } from '../features/service/serviceSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import ServiceItem from './ServiceItem'

export default function Services() {
    const { services, isLoading, isError, isSuccess, message } = useSelector((state) => state.service)

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        dispatch(getServices())
    }, [dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <BackButton url='/' />
            <h1 className="home-title">Services</h1>

            <div className="service-list-container">
                <div className="service-headings">
                    <div>Date</div>
                    <div>Service</div>
                    <div>Status</div>
                    <div>Actions</div>
                </div>

                {services.map((service) => (
                    <ServiceItem key={service._id} service={service} />
                ))}
            </div>
        </>
    )
}