import { Link } from "react-router-dom";
import {
  MdAdd,
  MdList,
  MdToday,
  MdSettings,
  MdViewList,
  MdPerson,
  MdPlayArrow,
} from "react-icons/md";

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
    {
      label: "Take a Turn",
      icon: <MdPlayArrow className="icon" />,
      link: "/take-turn",
    },
    {
      label: "Users",
      icon: <MdPerson className="icon" />,
      link: "/users",
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
