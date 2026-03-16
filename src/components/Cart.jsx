import Navbar from "./Navbar";
import "../styles/cart.css";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  const updateStorage = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (name) => {
    updateStorage(cart.filter((item) => item.name !== name));
  };

  const changeQty = (name, delta) => {
    const updated = cart.map((item) => {
      if (item.name === name) {
        return { ...item, qty: Math.max(1, item.qty + delta) };
      }
      return item;
    });
    updateStorage(updated);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="home-page">
      <Navbar />
      <main className="cart-main">
        <section className="cart-hero">
          <p className="hero-kicker">MY CART</p>
          <h1>
            <ShoppingCart size={32} className="cart-title-icon" /> Shopping Cart
          </h1>
        </section>

        {cart.length === 0 ? (
          <div className="empty-state">
            <ShoppingCart size={64} className="empty-icon" />
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <a href="/offers" className="explore-link">Browse Products</a>
          </div>
        ) : (
          <section className="cart-content">
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.name}>
                  <div className="cart-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-details">
                    <p className="cart-category">{item.category}</p>
                    <h3>{item.name}</h3>
                    <p className="cart-price">₹{item.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="qty-control">
                    <button onClick={() => changeQty(item.name, -1)}>
                      <Minus size={14} />
                    </button>
                    <span className="qty-value">{item.qty}</span>
                    <button onClick={() => changeQty(item.name, 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="cart-item-total">
                    ₹{(item.price * item.qty).toLocaleString('en-IN')}
                  </div>
                  <button className="remove-btn" onClick={() => removeItem(item.name)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{total >= 2000 ? "Free" : "₹99"}</span>
              </div>
              <div className="divider" />
              <div className="summary-row total-row">
                <span>Total</span>
                <span>₹{(total >= 2000 ? total : total + 99).toLocaleString('en-IN')}</span>
              </div>
              <button className="checkout-btn" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
              <p className="free-ship-note">
                {total < 2000
                  ? `Add ₹${(2000 - total).toLocaleString('en-IN')} more for free shipping!`
                  : "✓ You qualify for free shipping!"}
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
