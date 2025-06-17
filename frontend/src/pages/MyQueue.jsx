import { useEffect, useState } from 'react'
import { FaUser, FaCheck } from 'react-icons/fa'
import { reset, getQueues } from '../features/queue/queueSlice';
import { useDispatch } from 'react-redux';

export default function MyQueue() {
  const dispatch = useDispatch();
  // Dummy queue of customers
  const [queue, setQueue] = useState([
    { id: '001', name: 'Alice Johnson' },
    { id: '002', name: 'Bob Smith' },
    { id: '003', name: 'Carlos Diaz' },
  ])

  useEffect(() => {
    dispatch(getQueues());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    if (currentIndex < queue.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else {
      alert('No more customers in the queue.')
    }
  }

  const currentCustomer = queue[currentIndex]

  return (
    <div className="container">
      <h1 className="heading">
        <FaUser style={{ marginRight: '10px' }} />
        Current Turn
        <p>Attend the current customer and click "Done" to move to the next one</p>
      </h1>

      <div className="note" style={{ maxWidth: '400px', margin: 'auto', marginTop: '40px' }}>
        <h2>Customer in Turn</h2>
        {currentCustomer ? (
          <>
            <p><strong>Name:</strong> {currentCustomer.name}</p>
            <p><strong>ID:</strong> {currentCustomer.id}</p>
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
