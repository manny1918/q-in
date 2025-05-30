import { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {  email, password} = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        // if(password!==password2) {
        //     toast.error('The passwords do not match')
        // }
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