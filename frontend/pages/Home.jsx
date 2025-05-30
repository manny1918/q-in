import { Link } from "react-router-dom";
import {FaAccusoft, FaSearch} from 'react-icons/fa'
const company = import.meta.env.VITE_COMPANY_NAME || 'DEFAULT COMPANY';

export default function Home() {

    return (
        <>
            <section className="heading">
                <h1>
                    Welcome to {company}
                </h1>
                <p>Please select an option from below</p>
            </section>

            <Link to='/create-service' className='btn btn-reverse'><FaAccusoft/> Create a service</Link>
            <Link to='/services' className='btn btn-block'> <FaSearch/> Service</Link>
        </>
    )
}