import {Heart,Zap,ShoppingCart,Star} from 'lucide-react'
import '../styles/card.css'
import { useState } from 'react';
export default function Cart(){
    const [wished,setWished]=useState(false)
    const [added,setAdded]=useState(false)
return(
    <>
     <div className="card">
        
        <div className="badge">
          <Zap size={9} fill="#f5d142" /> Best Seller
        </div>

       
        <button
          className={`wish-btn ${wished ? "active" : ""}`}
          onClick={() => setWished(!wished)}
          aria-label="Wishlist"
        >
          <Heart size={16} stroke={wished ? "#f43f5e" : "#9a8f84"} strokeWidth={2} />
        </button>

       
        <div className="img-wrap">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/38/Arduino_Uno_-_R3.jpg"
            alt="Arduino Uno R3"
          />
        </div>

       
        <div className="card-body">
          <p className="category">Microcontroller · Arduino</p>
          <h2 className="product-name">Arduino Uno R3</h2>

         
          <div className="rating">
            <div className="stars">
              {[1,2,3,4,5].map(i => (
                <Star
                  key={i}
                  size={12}
                  fill={i <= 4 ? "#f5b942" : "none"}
                  stroke={i <= 4 ? "#f5b942" : "#c0b8a8"}
                  strokeWidth={1.5}
                />
              ))}
            </div>
            <span className="rating-count">4.0 (238 reviews)</span>
          </div>

          <p className="description">
            Beginner-friendly board for building robots, sensors, and interactive electronics projects.
          </p>

          
          <div className="stock-row">
            <span className="stock-dot" />
            In stock — ships in 1–2 days
          </div>

          <div className="divider" />

          <div className="bottom-row">
            <div className="price-block">
              <p className="price-label">Price</p>
              <p className="price">$27.99</p>
              <p className="price-original">$34.00</p>
            </div>

            <button
              className={`add-btn ${added ? "added" : ""}`}
            //   onClick={handleAddCart}
            >
              <ShoppingCart size={14} />
              <span>{added ? "Added!" : "Add to Cart"}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
