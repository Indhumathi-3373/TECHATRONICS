import Navbar from "./Navbar";
import "../styles/wishlist.css";
import { Heart, ShoppingCart, Trash2, ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [removingItem, setRemovingItem] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(stored);
  }, []);

  const removeItem = (name) => {
    setRemovingItem(name);
    setTimeout(() => {
      const updated = wishlist.filter((item) => item.name !== name);
      setWishlist(updated);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      setRemovingItem(null);
    }, 300);
  };

  const moveToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((c) => c.name === item.name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name: item.name, price: item.price, image: item.image, category: item.category, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    removeItem(item.name);
  };

  const totalValue = wishlist.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="home-page">
      <Navbar />
      <main className="wl-page">
        {/* Header bar */}
        <div className="wl-header">
          <div className="wl-header-left">
            <div className="wl-header-icon"><Heart size={20} /></div>
            <div>
              <h1>My Wishlist</h1>
              <p className="wl-count">{wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved</p>
            </div>
          </div>
          {wishlist.length > 0 && (
            <div className="wl-header-right">
              <span className="wl-total-label">Estimated total</span>
              <span className="wl-total-value">₹{totalValue.toLocaleString('en-IN')}</span>
            </div>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="wl-empty">
            <div className="wl-empty-circle">
              <Sparkles size={48} className="wl-empty-sparkle" />
            </div>
            <h2>Nothing here yet</h2>
            <p>Tap the <Heart size={14} className="wl-inline-icon" /> on any product to save it for later.</p>
            <Link to="/offers" className="wl-browse-btn">
              Browse Products <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="wl-list">
            {wishlist.map((item, idx) => (
              <div
                className={`wl-row ${removingItem === item.name ? "removing" : ""}`}
                key={item.name}
                style={{ animationDelay: `${idx * 0.07}s` }}
              >
                <div className="wl-row-img">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="wl-row-info">
                  <span className="wl-row-cat">{item.category}</span>
                  <h3 className="wl-row-name">{item.name}</h3>
                  <div className="wl-row-prices">
                    <span className="wl-row-price">₹{item.price.toLocaleString('en-IN')}</span>
                    {item.originalPrice && (
                      <span className="wl-row-old">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                    )}
                    {item.originalPrice && (
                      <span className="wl-row-save">
                        Save ₹{(item.originalPrice - item.price).toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="wl-row-actions">
                  <button className="wl-cart-btn" onClick={() => moveToCart(item)}>
                    <ShoppingCart size={15} />
                    <span>Add to Cart</span>
                  </button>
                  <button className="wl-remove-btn" onClick={() => removeItem(item.name)}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
