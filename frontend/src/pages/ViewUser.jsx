import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'

export default function ViewUser() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)

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
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== password2) {
            toast.error('The passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password
            }

            dispatch(register(userData))
        }
    }

    return (
        <>
            <section className="heading">
                <BackButton url='/users' />
                <h1>
                    <FaUser />View User
                </h1>
                <p>Please create an account</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            id='name' name='name'
                            value={name} className="form-control"
                            onChange={onChange}
                            placeholder='Enter your name'
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
                            placeholder='Enter your email'
                            required />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id='password'
                            name='password'
                            value={password}
                            className="form-control"
                            onChange={onChange}
                            placeholder='Enter your password'
                            required />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id='password2'
                            name='password2'
                            value={password2}
                            className="form-control"
                            onChange={onChange}
                            placeholder='Enter confirm your password'
                            required />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}