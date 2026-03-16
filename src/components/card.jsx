import { Heart, Zap, ShoppingCart, Star } from 'lucide-react'
import { useState } from 'react'
import '../styles/card.css'

import arduino from '../assets/Arduino_Uno_-_R3-transparent.png'
import capacitor from '../assets/electrolytic-capacitor.jpg'
import opticalSensor from '../assets/optical sensor.jpg'
import soundSensor from '../assets/Sound-sensor-module-small-1.webp'
import wireBundle from '../assets/wire.jpg'

const products = [
  {
    id: 'arduino-uno',
    name: 'Arduino Uno R3',
    category: 'Microcontroller - Arduino',
    rating: 4,
    reviews: 238,
    description: 'Beginner-friendly board for building robots, sensors, and interactive electronics projects.',
    price: '$27.99',
    original: '$34.00',
    stock: 'In stock - ships in 1-2 days',
    image: arduino,
    badge: 'Best Seller',
  },
  {
    id: 'sound-sensor',
    name: 'Sound Sensor Module',
    category: 'Sensor - Audio',
    rating: 5,
    reviews: 112,
    description: 'Detect sound levels for smart alarms, claps, and acoustic experiments.',
    price: '$6.50',
    original: '$8.00',
    stock: 'In stock - ships tomorrow',
    image: soundSensor,
    badge: 'New Drop',
  },
  {
    id: 'optical-sensor',
    name: 'Optical IR Sensor',
    category: 'Sensor - Motion',
    rating: 4,
    reviews: 86,
    description: 'Compact reflective sensor for line tracking and object detection builds.',
    price: '$3.20',
    original: '$4.50',
    stock: 'Low stock - 5 left',
    image: opticalSensor,
    badge: 'Fast Pick',
  },
  {
    id: 'capacitor',
    name: 'Electrolytic Capacitor Kit',
    category: 'Components - Power',
    rating: 5,
    reviews: 64,
    description: 'Assorted values to smooth voltage and stabilize your circuits.',
    price: '$9.90',
    original: '$12.00',
    stock: 'In stock - ships in 1-2 days',
    image: capacitor,
    badge: 'Starter Pack',
  },
  {
    id: 'wire-bundle',
    name: 'Jumper Wire Bundle',
    category: 'Accessories - Wiring',
    rating: 4,
    reviews: 143,
    description: 'Flexible wires for quick prototyping, breadboards, and test rigs.',
    price: '$5.40',
    original: '$7.25',
    stock: 'In stock - ships today',
    image: wireBundle,
    badge: 'Pro Tool',
  },
]

function ProductCard({ product }) {
  const [wished, setWished] = useState(false)
  const [added, setAdded] = useState(false)

  return (
    <div className="card">
      <div className="badge">
        <Zap size={9} fill="#f5d142" /> {product.badge}
      </div>

      <button
        className={`wish-btn ${wished ? 'active' : ''}`}
        onClick={() => setWished(!wished)}
        aria-label="Wishlist"
      >
        <Heart size={16} stroke={wished ? '#ff4d6d' : 'rgba(234, 246, 246, 0.55)'} strokeWidth={2} />
      </button>

      <div className="img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>

      <div className="card-body">
        <p className="category">{product.category}</p>
        <h2 className="product-name">{product.name}</h2>

        <div className="rating">
          <div className="stars">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={12}
                fill={i <= product.rating ? '#00e0ff' : 'none'}
                stroke={i <= product.rating ? '#00e0ff' : 'rgba(234, 246, 246, 0.35)'}
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span className="rating-count">{product.rating}.0 ({product.reviews} reviews)</span>
        </div>

        <p className="description">{product.description}</p>

        <div className="stock-row">
          <span className="stock-dot" />
          {product.stock}
        </div>

        <div className="divider" />

        <div className="bottom-row">
          <div className="price-block">
            <p className="price-label">Price</p>
            <p className="price">{product.price}</p>
            <p className="price-original">{product.original}</p>
          </div>

          <button className={`add-btn ${added ? 'added' : ''}`} onClick={() => setAdded(true)}>
            <ShoppingCart size={14} />
            <span>{added ? 'Added!' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Cart() {
  return (
    <div className="card-stage">
      <div className="card-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
