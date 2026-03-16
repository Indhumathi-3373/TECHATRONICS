import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import "../styles/offers.css";
import { useState } from "react";

// Asset imports
import imgArduino from "../assets/Arduino_Uno_-_R3-transparent.png";
import imgEsp32 from "../assets/esp32_devkit_1773661928582.png";
import imgRaspberryPi from "../assets/raspberry_pi_1773661948341.png";
import imgUltrasonic from "../assets/ultrasonic_sensor_1773662122321.png";
import imgDht22 from "../assets/dht22_sensor_1773662158996.png";
import imgServo from "../assets/servo_motor_1773662537547.png";

const PRODUCTS = [
  {
    name: "Arduino Uno R3",
    category: "Microcontroller · Arduino",
    price: 899,
    originalPrice: 1299,
    rating: 4,
    reviewCount: 238,
    image: imgArduino,
    description: "Beginner-friendly board for building robots, sensors, and interactive electronics projects.",
    badge: "Best Seller",
  },
  {
    name: "ESP32 DevKit V1",
    category: "Microcontroller · ESP",
    price: 549,
    originalPrice: 799,
    rating: 5,
    reviewCount: 412,
    image: imgEsp32,
    description: "Wi-Fi & Bluetooth enabled microcontroller, perfect for IoT and smart home projects.",
    badge: "Hot Deal",
  },
  {
    name: "Raspberry Pi 4 Model B",
    category: "Single Board · Raspberry Pi",
    price: 4499,
    originalPrice: 5499,
    rating: 5,
    reviewCount: 892,
    image: imgRaspberryPi,
    description: "Powerful single-board computer for advanced projects, media centers, and edge computing.",
    badge: "Popular",
  },
  {
    name: "HC-SR04 Ultrasonic Sensor",
    category: "Sensor · Distance",
    price: 149,
    originalPrice: 249,
    rating: 4,
    reviewCount: 1024,
    image: imgUltrasonic,
    description: "Non-contact distance measurement module with 2cm–400cm range for robotics and automation.",
    badge: "Sale",
  },
  {
    name: "DHT22 Temperature Sensor",
    category: "Sensor · Environment",
    price: 349,
    originalPrice: 499,
    rating: 4,
    reviewCount: 578,
    image: imgDht22,
    description: "High-precision digital temperature and humidity sensor for weather stations and monitoring.",
    badge: "",
  },
  {
    name: "SG90 Micro Servo Motor",
    category: "Actuator · Motor",
    price: 199,
    originalPrice: 349,
    rating: 4,
    reviewCount: 820,
    image: imgServo,
    description: "Lightweight 9g servo motor ideal for robotic arms, RC cars, and pan-tilt mechanisms.",
    badge: "Best Value",
  },
];

const CATEGORIES = ["All", "Microcontroller", "Sensor", "Actuator", "Single Board"];

export default function Offers() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = PRODUCTS.filter((p) => {
    const matchCategory = selectedCategory === "All" || p.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="home-page">
      <Navbar />
      <main className="offers-main">
        <section className="offers-hero">
          <p className="hero-kicker">SHOP NOW</p>
          <h1>Explore Our Products</h1>
          <p className="offers-subtitle">
            Browse our collection of Arduino boards, sensors, modules, and maker essentials.
          </p>
        </section>

        <section className="offers-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="category-filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`cat-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="products-grid">
          {filtered.length > 0 ? (
            filtered.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))
          ) : (
            <p className="no-results">No products found matching your criteria.</p>
          )}
        </section>
      </main>
    </div>
  );
}
