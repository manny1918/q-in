import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

export default function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <header className="header">
            <div className="logo">
                <Link to='/'>Queue Management System</Link>
            </div>
            <ul>
                {user ? (
                    <>
                        <li className="user-name">
                            <FaUser style={{ marginRight: '5px' }} />
                            {user.name}
                        </li>
                        <li>
                            <button className="btn" onClick={onLogout}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link to='/login'>
                            <FaSignInAlt /> Login
                        </Link>
                    </li>
                )}
            </ul>
        </header>
    )
}
