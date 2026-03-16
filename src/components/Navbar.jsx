import { Link, useLocation } from "react-router-dom";
import { Heart, ShoppingCart, Search } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    window.location.href = "/";
  };

  return (
    <header className="topbar">
      <Link className="brand" to="/">
        TECHATRONICS
      </Link>

      <nav>
        <ul className="menu">
          <li>
            <Link className={location.pathname === "/" ? "active" : ""} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={location.pathname === "/offers" ? "active" : ""} to="/offers">
              Offers
            </Link>
          </li>
          <li>
            <Link className={location.pathname === "/about" ? "active" : ""} to="/about">
              About us
            </Link>
          </li>
          <li>
            <Link className={location.pathname === "/contact" ? "active" : ""} to="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <nav>
        <ul className="centermenu">
          <li>
            <Link className="search" to="/offers">
              <Search size={20} />
            </Link>
          </li>
          <li>
            <Link to="/wishlist">
              <Heart size={20} />
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <ShoppingCart size={20} />
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button className="nav-sign" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link className="nav-sign" to="/register">
                Sign Up
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
