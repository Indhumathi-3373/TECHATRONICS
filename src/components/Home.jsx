import "../styles/home.css";
import { Heart, ShoppingCart, Search } from "lucide-react";
import arduinoImg from "../assets/Arduino_Uno_-_R3-transparent.png";

export default function Home() {
  return (
    <>
      <div className="home-page">
        <header className="topbar">
          <a className="brand" href="/">
            TECHATRONICS
          </a>

          <nav>
            <ul className="menu">
              <li>
                <a className="active" href="/">
                  Home
                </a>
              </li>
              <li>
                <a href="offers.jsx">Offers</a>
              </li>
              <li>
                <a href="about.jsx">About us</a>
              </li>
              <li>
                <a href="contact.jsx">Contact</a>
              </li>
              
            </ul>
          </nav>
          <nav>
            <ul className="centermenu">
              <li>
                <a className="search">
                  <Search size={20}></Search>
                </a>
              </li>
              <li>
                <a href="wishlist.jsx">
                  <Heart size={20}></Heart>
                </a>
              </li>
              <li>
                <a href="order.jsx">
                  <ShoppingCart size={20}></ShoppingCart>
                </a>
              </li><li>
                <a className="nav-sign" href="/login">
                  Sign In
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <section className="body">
            <div className="left-half">
              <div className="hero-content">
                <p className="hero-kicker">SMART ELECTRONICS STORE</p>
                <h1>Build Better Projects with TECHATRONICS</h1>
                <p className="hero-text">
                  TECHATRONICS brings together Arduino boards, sensors, modules, and maker
                  essentials in one place. Whether you are a beginner, student, or project
                  builder, find reliable components and start creating faster.
                </p>
                <div className="hero-actions">
                  <a className="explore-btn" href="offers.jsx">
                    Explore Now
                  </a>
                  <a className="ghost-btn" href="about.jsx">
                    Learn More
                  </a>
                </div>
                <div className="hero-tags">
                  <span>Arduino</span>
                  <span>Sensors</span>
                  <span>IoT Kits</span>
                </div>
              </div>
            </div>
            <div className="right-half">
              <div className="arduino-wrap">
                <img src={arduinoImg} alt="Arduino Uno R3" className="arduino-image" />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
