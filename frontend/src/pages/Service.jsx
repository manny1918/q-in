import { useSelector, useDispatch } from "react-redux"
import { reset, getService } from '../features/service/serviceSlice'
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { toast } from "react-toastify"

export default function Service() {

    const { service, isLoading, isError, isSuccees, message } = useSelector((state) => { return state.service })

    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getService(params.serviceId))
    }, [isError, message, params.serviceId])

    if(isLoading){
        return <Spinner/>
    }

    if(isError){
        return <h3>Something went wrong</h3>
    }

    return (
        <div className="service-page">
            <header className="service-header">
                <BackButton url='/services'/>
                <h2>Service ID: {params.serviceId}</h2>
                <h3>Created on: {new Date(service.createdAt).toLocaleString()}</h3>
                <hr />
                <div className="service-desc">
                    <h3>Service Name: </h3>
                    <p>${service.serviceName}</p>
                </div>
            </header>
        </div>
    )
}