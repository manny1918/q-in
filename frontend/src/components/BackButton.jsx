import { Link } from "react-router-dom";
import { FaArrowCircleLeft } from 'react-icons/fa'

export default function BackButton({ url }) {
    return (
        <Link to={url} className="btn btn-reverse">
            <FaArrowCircleLeft />Back
        </Link>
    )
}