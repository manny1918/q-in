import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/')
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

        const userData = {
            email, password
        }

        dispatch(login(userData))
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt />Login
                </h1>
                <p>Please log in</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
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
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}