import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import { getServices } from '../features/service/serviceSlice'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Select from 'react-select'

export default function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const [selectedServices, setSelectedServices] = useState([])

  const { name, email, password, password2 } = formData

  const { services } = useSelector(state => state.service)
  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getServices())
  }, [dispatch])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      navigate('/users')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, navigate, dispatch])

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

    const userData = {
      name,
      email,
      password,
      services: selectedServices.map(s => s.value) // Array of ObjectIds
    }

    dispatch(register(userData))
  }

  const serviceOptions = (services || []).map(s => ({
    value: s._id,
    label: s.serviceName
  }))

  return (
    <>
      <section className="heading">
        <BackButton url='/users' />
        <h1><FaUser /> Register</h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={name}
              className="form-control"
              onChange={onChange}
              placeholder="Enter your name"
              required />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={email}
              className="form-control"
              onChange={onChange}
              placeholder="Enter your email"
              required />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={password}
              className="form-control"
              onChange={onChange}
              placeholder="Enter your password"
              required />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password2"
              value={password2}
              className="form-control"
              onChange={onChange}
              placeholder="Confirm your password"
              required />
          </div>

          <div className="form-group">
            <label>Select Services:</label>
            <Select
              options={serviceOptions}
              value={selectedServices}
              onChange={setSelectedServices}
              isMulti
              placeholder="Assign services to user..."
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}
