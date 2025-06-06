import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getServices } from '../features/service/serviceSlice'
// import { takeTurn } from '../features/turn/turnSlice'
import { toast } from 'react-toastify'
import { FaClock } from 'react-icons/fa'

export default function TakeTurn() {
  const dispatch = useDispatch()
  const { services, isLoading, isError, message } = useSelector(state => state.service)

  useEffect(() => {
    dispatch(getServices())
  }, [dispatch])

  useEffect(() => {
    if (isError) toast.error(message)
  }, [isError, message])

  const handleTakeTurn = (serviceId) => {
    dispatch(takeTurn(serviceId))
      .unwrap()
      .then(() => toast.success('You have been added to the queue!'))
      .catch(err => toast.error(err?.message || 'Failed to take turn'))
  }

  return (
    <div className="container">
      <h1 className="heading">
        <FaClock style={{ marginRight: '10px' }} />
        Take a Turn
        <p>Select a service below to join its queue</p>
      </h1>

      <div className="card-grid">
        {services?.map(service => (
          <div key={service._id} className="card">
            <div className="icon"><FaClock /></div>
            <h2>{service.serviceName}</h2>
            {/* <p>{service.description}</p> */}
            <button className="btn btn-block" onClick={() => handleTakeTurn(service._id)}>
              Join Queue
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
