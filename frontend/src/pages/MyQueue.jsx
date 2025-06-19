import { useEffect, useState } from 'react'
import { FaUser, FaCheck } from 'react-icons/fa'
import { reset as resetQueue, getQueue, removeFromQueue } from '../features/queue/queueSlice'
import { reset as resetCustomer, getCustomers } from '../features/customer/customerSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function MyQueue() {
  const dispatch = useDispatch()
  const params = useParams()

  const { queue } = useSelector((state) => state.queue)
  const { customers } = useSelector((state) => state.customer)

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    dispatch(getQueue())

    return () => {
      dispatch(resetQueue())
    }
  }, [dispatch, params.userId])

  useEffect(() => {
    dispatch(getCustomers())

    return () => {
      dispatch(resetCustomer())
    }
  }, [dispatch])

  const currentCustomer = queue[currentIndex]

  const handleNext = async () => {
    if (!currentCustomer) return

    await dispatch(removeFromQueue(currentCustomer._id))

    // If this was the last customer, no need to increment
    if (currentIndex >= queue.length - 1) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const customerInfo = customers?.find(
    (c) => c._id === currentCustomer?.customerId
  )

  return (
    <div className="container">
      <h1 className="heading">
        <FaUser style={{ marginRight: '10px' }} />
        Current Turn
        <p>Attend the current customer and click "Done" to move to the next one</p>
      </h1>

      <div className="note" style={{ maxWidth: '400px', margin: 'auto', marginTop: '40px' }}>
        <h2>Customer in Turn</h2>
        {queue.length > 0 && currentCustomer ? (
          <>
            <p><strong>Name:</strong> {customerInfo?.name || 'Unknown'}</p>
            <p><strong>ID:</strong> {currentCustomer._id}</p>
            <button className="btn btn-primary btn-block" onClick={handleNext}>
              <FaCheck style={{ marginRight: '8px' }} />
              Done
            </button>
          </>
        ) : (
          <p>No customers in the queue</p>
        )}
      </div>
    </div>
  )
}
