import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { getUser, updateUser } from '../features/user/userSlice'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Select from 'react-select'

export default function ViewUser() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { viewUser, isError, message } = useSelector(state => state.user)
  console.log(JSON.stringify(viewUser.services))

  const [selectedServices, setSelectedServices] = useState(viewUser.services)

  const { name, email, password, password2 } = formData

  const { services } = useSelector(state => state.service)

  // Fetch user and available services
  useEffect(() => {
    dispatch(getUser(params.userId))
    // dispatch(getServices())
  }, [dispatch, params.userId])

  // Populate form when viewUser loads
  useEffect(() => {
    if (viewUser) {
      setFormData({
        name: viewUser.name || '',
        email: viewUser.email || '',
        password: '',
        password2: ''
      })

      setSelectedServices(
        (viewUser.services || []).map(service => ({
          value: service._id,
          label: service.serviceName
        }))
      )
    }
  }, [viewUser])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError, message])

  const onChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      toast.error('The passwords do not match')
      return
    }

    const data = {
      id: params.userId,
      userData: {
        name,
        email,
        password,
        serviceIds: selectedServices.map(s => s.value)
      }
    }

    dispatch(updateUser(data))
    toast.success('User successfully updated')
    navigate('/users')
  }

  const serviceOptions = (services || []).map(s => ({
    value: s._id,
    label: `${s.serviceName}`
  }))

  return (
    <>
      <section className="heading">
        <BackButton url='/users' />
        <h1><FaUser /> Edit User</h1>
        <p>Update user details and assign services</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              id='name'
              name='name'
              value={name}
              className="form-control"
              onChange={onChange}
              placeholder='Enter name'
              required />
          </div>
          <div className="form-group">
            <input
              type="email"
              id='email'
              name='email'
              value={email}
              className="form-control"
              onChange={onChange}
              placeholder='Enter email'
              required />
          </div>

          <div className="form-group">
            <label>Select Services:</label>
            <Select
              options={serviceOptions}
              value={selectedServices}
              onChange={setSelectedServices}
              isMulti
              placeholder="Select services..."
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Update User</button>
          </div>
        </form>
      </section>
    </>
  )
}
