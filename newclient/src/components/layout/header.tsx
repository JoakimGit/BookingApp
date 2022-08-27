import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faCar, faPlane, faTaxi, faBaseballBatBall } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-center bg-darkblue pt-8 pb-6 text-white">
      <div className="w-full max-w-content">
        <div className="mb-8 flex justify-between">
          <Link to="/">
            <h2 className="text-2xl font-bold">MyBooking</h2>
          </Link>
          <div className="flex items-center gap-4">
            <span>Welcome username</span>
            <Link to="" className="bg-lightblue p-2 text-white hover:bg-lightblue/90">
              Register
            </Link>
            <Link to="" className="bg-lightblue p-2 text-white hover:bg-lightblue/90">
              Login
            </Link>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "rounded-full border border-white py-3 px-3 hover:bg-[#224e8b]" : ""
            }
          >
            <div className="space-x-2">
              <FontAwesomeIcon icon={faBed} />
              <span>Stays</span>
            </div>
          </NavLink>
          <NavLink
            to="/flights"
            className={({ isActive }) =>
              isActive ? "rounded-full border border-white py-3 px-3 hover:bg-[#224e8b]" : ""
            }
          >
            <div className="space-x-2">
              <FontAwesomeIcon icon={faPlane} />
              <span>Flights</span>
            </div>
          </NavLink>
          <NavLink
            to="/rentals"
            className={({ isActive }) =>
              isActive ? "rounded-full border border-white py-3 px-3 hover:bg-[#224e8b]" : ""
            }
          >
            <div className="space-x-2">
              <FontAwesomeIcon icon={faCar} />
              <span>Car rentals</span>
            </div>
          </NavLink>
          <NavLink
            to="/attractions"
            className={({ isActive }) =>
              isActive ? "rounded-full border border-white py-3 px-3 hover:bg-[#224e8b]" : ""
            }
          >
            <div className="space-x-2">
              <FontAwesomeIcon icon={faBaseballBatBall} />
              <span>Attractions</span>
            </div>
          </NavLink>
          <NavLink
            to="/taxis"
            className={({ isActive }) =>
              isActive ? "rounded-full border border-white py-3 px-3 hover:bg-[#224e8b]" : ""
            }
          >
            <div className="space-x-2">
              <FontAwesomeIcon icon={faTaxi} />
              <span>Airport taxis</span>
            </div>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Header;
