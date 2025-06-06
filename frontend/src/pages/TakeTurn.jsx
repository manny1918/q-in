import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getServices } from '../features/service/serviceSlice'
import { createCustomer } from '../features/customer/customerSlice'
import { addCustomerToQueue } from '../features/queue/queueSlice'
import { toast } from 'react-toastify'
import { FaClock } from 'react-icons/fa'

export default function TakeTurn() {
  const dispatch = useDispatch()
  const { services, isLoading, isError, message } = useSelector(state => state.service)

  const [showModal, setShowModal] = useState(true)
  const [customerName, setCustomerName] = useState('')
  const [customerId, setCustomerId] = useState('')
  const [selectedServiceIds, setSelectedServiceIds] = useState([])
  const [selectionDone, setSelectionDone] = useState(false)
  const [customerCreated, setCustomerCreated] = useState(false)

  useEffect(() => {
    dispatch(getServices())
  }, [dispatch])

  useEffect(() => {
    if (isError) toast.error(message)
  }, [isError, message])

  const toggleServiceSelection = (serviceId) => {
    setSelectedServiceIds(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const handleContinue = async () => {
    if (!customerName || !customerId) {
      toast.error('Please fill out both fields')
      return
    }

    try {
      await dispatch(createCustomer({ name: customerName, identification: customerId })).unwrap()
      setShowModal(false)
      setCustomerCreated(true)
    } catch (err) {
      toast.error(err?.message || 'Failed to create customer')
    }
  }

  const handleJoinQueues = async () => {
    if (selectedServiceIds.length === 0) {
      toast.error('Please select at least one service')
      return
    }

    try {
      for (const serviceId of selectedServiceIds) {
        await dispatch(addCustomerToQueue({ serviceId, customerId })).unwrap()
      }
      toast.success('You have been added to the selected queues!')
      setSelectionDone(true)
    } catch (err) {
      toast.error(err?.message || 'Something went wrong')
    }
  }

  const handleReset = () => {
    setCustomerName('')
    setCustomerId('')
    setSelectedServiceIds([])
    setShowModal(true)
    setSelectionDone(false)
    setCustomerCreated(false)
  }

  return (
    <div className="container">
      <h1 className="heading">
        <FaClock style={{ marginRight: '10px' }} />
        Take a Turn
        <p>Select one or more services below to join their queues</p>
      </h1>

      {/* Grid of Services */}
      {customerCreated && (
        <>
          <div className="card-grid">
            {services?.map(service => (
              <div
                key={service._id}
                className={`card ${selectedServiceIds.includes(service._id) ? 'selected' : ''}`}
                onClick={() => toggleServiceSelection(service._id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="icon"><FaClock /></div>
                <h2>{service.serviceName}</h2>
                {selectedServiceIds.includes(service._id) && <p style={{ color: 'green' }}>Selected</p>}
              </div>
            ))}
          </div>

          {!selectionDone && (
            <div style={{ marginTop: '20px' }}>
              <button className="btn btn-primary btn-block" onClick={handleJoinQueues}>
                Join Selected Queues
              </button>
            </div>
          )}
        </>
      )}

      {selectionDone && (
        <div style={{ marginTop: '20px' }}>
          <button className="btn btn-primary btn-block" onClick={handleReset}>
            Done / Next Customer
          </button>
        </div>
      )}

      {/* Popup for Name & ID */}
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
            <button className="btn btn-block" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
