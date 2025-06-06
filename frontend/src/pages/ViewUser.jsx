import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../features/user/userSlice'
import { getServices } from '../features/service/serviceSlice'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
    const [selectedServices, setSelectedServices] = useState([])

    const { name, email, password, password2 } = formData

    const { viewUser, isLoading, isError, isSuccess, message } = useSelector(state => state.user)
    const { services } = useSelector(state => state.service)

    // Load user and all services
    useEffect(() => {
        dispatch(getUser(params.userId))
        dispatch(getServices())
    }, [dispatch, params.userId])

    // Populate form and services
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
    }, [isError, isSuccess, navigate, dispatch, message])

    return (
        <>
            <section className="heading">
                <BackButton url='/users' />
                <h1><FaUser /> View User</h1>
                <p>View user details and assigned services</p>
            </section>

            <section className="form">
                <form>
                    <div className="form-group">
                        <input
                            type="text"
                            name='name'
                            value={name}
                            className="form-control"
                            disabled />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name='email'
                            value={email}
                            className="form-control"
                            disabled />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name='password'
                            value={password}
                            className="form-control"
                            disabled />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name='password2'
                            value={password2}
                            className="form-control"
                            disabled />
                    </div>

                    <div className="form-group">
                        <label>Assigned Services:</label>
                        <Select
                            value={selectedServices}
                            isMulti
                            isDisabled
                            classNamePrefix="react-select"
                        />
                    </div>

                    <div className="form-group">
                        <Link to={`/users/edit/${params.userId}`} className="btn btn-block">Edit</Link>
                    </div>
                </form>
            </section>
        </>
    )
}
