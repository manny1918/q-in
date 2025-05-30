import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../features/auth/authSlice'

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData

    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)

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
        }
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser />Register{user}
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