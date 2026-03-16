import { Heart, Zap, ShoppingCart, Star, Eye } from "lucide-react";
import { useState } from "react";
import "../styles/product-card.css";

export default function ProductCard({
  name = "Arduino Uno R3",
  category = "Microcontroller · Arduino",
  price = 899,
  originalPrice = 1299,
  rating = 4,
  reviewCount = 238,
  image,
  description = "Beginner-friendly board for building robots, sensors, and interactive electronics projects.",
  inStock = true,
  badge = "Best Seller",
}) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const [imgHover, setImgHover] = useState(false);

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    setAdded(true);
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item) => item.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, image, category, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlist = () => {
    setWished(!wished);
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (!wished) {
      if (!wishlist.find((item) => item.name === name)) {
        wishlist.push({ name, price, image, category, originalPrice });
      }
    } else {
      const idx = wishlist.findIndex((item) => item.name === name);
      if (idx > -1) wishlist.splice(idx, 1);
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  return (
    <div className="pc-card">
      {/* ── Image Section ── */}
      <div
        className="pc-visual"
        onMouseEnter={() => setImgHover(true)}
        onMouseLeave={() => setImgHover(false)}
      >
        {badge && (
          <span className="pc-badge">
            <Zap size={10} /> {badge}
          </span>
        )}

        {discount > 0 && (
          <span className="pc-discount">-{discount}%</span>
        )}

        <div className="pc-actions-float">
          <button
            className={`pc-float-btn ${wished ? "wished" : ""}`}
            onClick={handleWishlist}
            title="Add to Wishlist"
          >
            <Heart size={16} fill={wished ? "#f43f5e" : "none"} />
          </button>
          <button className="pc-float-btn" title="Quick View">
            <Eye size={16} />
          </button>
        </div>

        <img
          className={`pc-product-img ${imgHover ? "zoomed" : ""}`}
          src={image}
          alt={name}
        />
      </div>

      {/* ── Details Section ── */}
      <div className="pc-details">
        <span className="pc-cat">{category}</span>
        <h3 className="pc-title">{name}</h3>

        <div className="pc-stars-row">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={14}
              fill={i <= rating ? "#fbbf24" : "none"}
              stroke={i <= rating ? "#fbbf24" : "#475569"}
              strokeWidth={1.6}
            />
          ))}
          <span className="pc-reviews">({reviewCount})</span>
        </div>

        <p className="pc-desc">{description}</p>

        {inStock && (
          <div className="pc-stock">
            <span className="pc-stock-dot" />
            In Stock
          </div>
        )}

        <div className="pc-price-row">
          <span className="pc-current-price">₹{price.toLocaleString('en-IN')}</span>
          {originalPrice && (
            <span className="pc-old-price">₹{originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>

        <button
          className={`pc-cart-btn ${added ? "added" : ""}`}
          onClick={handleAddToCart}
        >
          <ShoppingCart size={16} />
          <span>{added ? "Added ✓" : "Add to Cart"}</span>
        </button>
      </div>
    </div>
  );
}
