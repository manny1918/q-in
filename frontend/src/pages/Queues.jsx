import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQueues, reset } from '../features/queue/queueSlice'

export default function Queues() {
  const dispatch = useDispatch()
  const { queues, isLoading } = useSelector((state) => state.queue)

  useEffect(() => {
    dispatch(getQueues())
    return () => dispatch(reset())
  }, [dispatch])

  // Group queues by userId
  const groupedQueues = queues.reduce((acc, item) => {
    const userId = item.userId || 'Unknown User'
    if (!acc[userId]) acc[userId] = []
    acc[userId].push(item)
    return acc
  }, {})

  return (
    <div className="container">
      <h1 className="heading">Users and Their Queues</h1>

      {isLoading ? (
        <p>Loading queues...</p>
      ) : Object.keys(groupedQueues).length > 0 ? (
        Object.entries(groupedQueues).map(([userId, userQueues]) => (
          <div key={userId} className="note" style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '20px' }}>
              User: <span style={{ color: '#2563eb' }}>{userId}</span>
            </h2>

            <div className="service-headings">
              <div>Customer Name</div>
              <div>Queue ID</div>
              <div>Status</div>
              <div>Position</div>
            </div>

            {userQueues.map((item, index) => (
              <div key={item._id} className="service">
                <div>{item.customerName || item.customerId}</div>
                <div>{item.queueId || item._id}</div>
                <div className={`status status-${(item.status || 'waiting').toLowerCase()}`}>
                  {item.status || 'Waiting'}
                </div>
                <div>{index + 1}</div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No queues available.</p>
      )}
    </div>
  )
}
