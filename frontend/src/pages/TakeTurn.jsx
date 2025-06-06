import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getServices } from '../features/service/serviceSlice'
// import { takeTurn } from '../features/turn/turnSlice'
import { toast } from 'react-toastify'
import { FaClock } from 'react-icons/fa'

export default function TakeTurn() {
  const dispatch = useDispatch()
  const { services, isLoading, isError, message } = useSelector(state => state.service)

  const [showModal, setShowModal] = useState(true)
  const [customerName, setCustomerName] = useState('')
  const [customerId, setCustomerId] = useState('')

  useEffect(() => {
    dispatch(getServices())
  }, [dispatch])

  useEffect(() => {
    if (isError) toast.error(message)
  }, [isError, message])

  const handleTakeTurn = (serviceId) => {
    if (!customerName || !customerId) {
      toast.error('Please enter your name and ID first.')
      setShowModal(true)
      return
    }

    dispatch(takeTurn({ serviceId, customerName, customerId }))
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
            <button className="btn btn-block" onClick={() => handleTakeTurn(service._id)}>
              Join Queue
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="loadingSpinnerContainer">
          <div className="note" style={{ maxWidth: '400px', width: '100%' }}>
            <h2 style={{ marginBottom: '15px' }}>Enter your details</h2>
            <div className="form-group">
              <label htmlFor="customerName">Name</label>
              <input
                type="text"
                id="customerName"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="customerId">Identification Number</label>
              <input
                type="text"
                id="customerId"
                value={customerId}
                onChange={e => setCustomerId(e.target.value)}
                required
              />
            </div>
            <button
              className="btn btn-block"
              onClick={() => {
                if (!customerName || !customerId) {
                  toast.error('Please fill out both fields')
                } else {
                  setShowModal(false)
                }
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
