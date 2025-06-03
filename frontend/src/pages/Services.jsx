import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reset, getServices } from '../features/service/serviceSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

export default function Services() {
    const {services, isLoading, isError, isSuccess, message} = useSelector((state)=> state.service)

    const dispatch = useDispatch()

    useEffect(()=>{
        return ()=>{
            if(isSuccess){
                dispatch(reset)
            }
        }
    }, [dispatch, isSuccess])

    useEffect(()=>{
        dispatch(getServices())
    }, [dispatch])

    if(isLoading){
        return <Spinner/>
    }

    return (
        <div>
            <h1>Services</h1>
        </div>
    )
}