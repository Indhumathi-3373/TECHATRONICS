import { Link, useLocation, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Search, LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
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
              <Search size={20} className="nav-icon" />
            </Link>
          </li>
          <li>
            <Link to="/wishlist">
              <Heart size={20} className="nav-icon" />
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <ShoppingCart size={20} className="nav-icon" />
            </Link>
          </li>
          <li>
            {isAuthenticated ? (
              <div className="nav-user-group">
                <span className="nav-user-name" title={user?.email}>
                  <User size={16} />
                  {user?.email?.split("@")[0]}
                </span>
                <button className="nav-sign nav-logout-btn" onClick={handleLogout}>
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <Link className="nav-sign" to="/login">
                Sign In
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
