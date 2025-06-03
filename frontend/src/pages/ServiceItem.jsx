import { className } from "babylonjs"
import { Link } from "react-router-dom"
export default function ServiceItem({service}){
    return(
        <div className="service">
            <div>{new Date(service.createdAt).toLocaleString()}</div>
            <div>{service.serviceName}</div>
            <div className="status-new">
                new
            </div>
            <Link to={`services/${service._id}`} className = 'btn btn-reverse btn-sm'>View</Link>
        </div>
    )
}