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

    return (
        <h1>Service {params.serviceId}</h1>
    )
}