import "../styles/home.css";
import Navbar from "./Navbar";
import arduinoImg from "../assets/Arduino_Uno_-_R3-transparent.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="home-page">
        <Navbar />
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
                  <Link className="explore-btn" to="/offers">
                    Explore Now
                  </Link>
                  <Link className="ghost-btn" to="/about">
                    Learn More
                  </Link>
                </div>
                <div className="hero-tags">
                  <span>Arduino</span>
                  <span>Sensors</span>
                  <span>IoT Kits</span>
                </div>
              </div>
            </div>
            <div className="right-half">
              {/* <div className="arduino-wrap"> */}
                <img src={arduinoImg} alt="Arduino Uno R3" className="arduino-image" />
              {/* </div> */}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
