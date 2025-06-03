import { Link } from "react-router-dom";
import { MdAdd, MdList, MdToday, MdSettings, MdViewList } from "react-icons/md";

const company = import.meta.env.VITE_COMPANY_NAME || "Default Company";

export default function Home() {
  const options = [
    {
      label: "New Service",
      icon: <MdAdd className="icon" />,
      link: "/new-service",
    },
    {
      label: "View Services",
      icon: <MdViewList className="icon" />,
      link: "/services",
    },
    {
      label: "Queue",
      icon: <MdList className="icon" />,
      link: "/queue",
    },
    {
      label: "Today's Turns",
      icon: <MdToday className="icon" />,
      link: "/today",
    },
    {
      label: "Settings",
      icon: <MdSettings className="icon" />,
      link: "/settings",
    },
  ];

  return (
    <section className="home-container">
      <h1 className="home-title">Welcome to {company}</h1>
      <p className="home-subtitle">What would you like to do today?</p>

      <div className="card-grid">
        {options.map((option, index) => (
          <Link key={index} to={option.link} className="card">
            {option.icon}
            <span>{option.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

// import { Link } from "react-router-dom";
// import {MdAdd, MdAllInclusive} from 'react-icons/md'
// const company = import.meta.env.VITE_COMPANY_NAME || 'DEFAULT COMPANY';

// export default function Home() {

//     return (
//                 <>
//             <section className="heading">
//                 <h1>What do you need help with?</h1>
//                 <p>Please choose one of the options below</p>
//             </section>
//             <Link to='/new-service' className="btn btn-reverse btn-block"><MdAdd/>Create new service</Link>
//             <Link to='/services' className="btn btn-block"><MdAllInclusive/>View services</Link>
//         </>
//     )
// }