import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQueues, reset as resetQueues } from '../features/queue/queueSlice'
import { getUsers, reset as resetUsers } from '../features/user/userSlice'

export default function Queues() {
  const dispatch = useDispatch()

  const { queues, isLoading: queuesLoading } = useSelector((state) => state.queue)
  const { users, isLoading: usersLoading } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getQueues())
    dispatch(getUsers())

    return () => {
      dispatch(resetQueues())
      dispatch(resetUsers())
    }
  }, [dispatch])

  // Create a map of userId -> userName
  const userMap = users.reduce((acc, user) => {
    acc[user._id] = user.name
    return acc
  }, {})

  // Group queues by user name
  const groupedQueues = queues.reduce((acc, queue) => {
    const userName = userMap[queue.userId] || 'Unknown User'
    if (!acc[userName]) acc[userName] = []
    acc[userName].push(queue)
    return acc
  }, {})

  return (
    <div className="container">
      <h1 className="heading">Queues by User</h1>

      {(queuesLoading || usersLoading) ? (
        <p>Loading...</p>
      ) : Object.keys(groupedQueues).length === 0 ? (
        <p>No queues available.</p>
      ) : (
        Object.entries(groupedQueues).map(([userName, userQueues]) => (
          <div key={userName} className="note" style={{ marginBottom: '40px' }}>
            <h2>User: <span style={{ color: '#2563eb' }}>{userName}</span></h2>

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
      )}
    </div>
  )
}
