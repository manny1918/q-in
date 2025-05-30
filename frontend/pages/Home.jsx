import { Link } from "react-router-dom";
import {MdAdd, MdAllInclusive} from 'react-icons/md'
const company = import.meta.env.VITE_COMPANY_NAME || 'DEFAULT COMPANY';

export default function Home() {

    return (
                <>
            <section className="heading">
                <h1>What do you need help with?</h1>
                <p>Please choose one of the options below</p>
            </section>
            <Link to='/new-service' className="btn btn-reverse btn-block"><MdAdd/>Create new service</Link>
            <Link to='/services' className="btn btn-block"><MdAllInclusive/>View services</Link>
        </>
    )
}