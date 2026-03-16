import Navbar from "./Navbar";
import "../styles/order-success.css";
import { CheckCircle2, Package, ArrowRight, Copy } from "lucide-react";
import { useLocation, Link, Navigate } from "react-router-dom";
import { useState } from "react";

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;
  const [copied, setCopied] = useState(false);

  if (!order) return <Navigate to="/" />;

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const orderDate = new Date(order.date);
  const estimatedDelivery = new Date(orderDate);
  const daysToAdd = order.shipping.id === "overnight" ? 1 : order.shipping.id === "express" ? 3 : 7;
  estimatedDelivery.setDate(estimatedDelivery.getDate() + daysToAdd);

  return (
    <div className="home-page">
      <Navbar />
      <main className="os-page">
        {/* ── Success hero ── */}
        <section className="os-hero">
          <div className="os-check-wrap">
            <CheckCircle2 size={72} className="os-check-icon" />
          </div>
          <h1>Order Placed Successfully!</h1>
          <p className="os-subtitle">
            Thank you for shopping with TECHATRONICS. Your order is being processed.
          </p>
        </section>

        {/* ── Order ID card ── */}
        <section className="os-id-card">
          <div className="os-id-left">
            <span className="os-id-label">ORDER ID</span>
            <span className="os-id-value">{order.id}</span>
          </div>
          <button className="os-copy-btn" onClick={copyOrderId}>
            <Copy size={14} /> {copied ? "Copied!" : "Copy"}
          </button>
        </section>

        {/* ── Order details ── */}
        <div className="os-grid">
          {/* Items */}
          <section className="os-card">
            <h3><Package size={18} /> Items Ordered ({order.items.reduce((s, i) => s + i.qty, 0)})</h3>
            <div className="os-items">
              {order.items.map((item) => (
                <div className="os-item" key={item.name}>
                  <div className="os-item-img"><img src={item.image} alt={item.name} /></div>
                  <div className="os-item-info">
                    <span className="os-item-name">{item.name}</span>
                    <span className="os-item-cat">{item.category}</span>
                    <span className="os-item-qty">Qty: {item.qty}</span>
                  </div>
                  <span className="os-item-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Summary + details */}
          <section className="os-card">
            <h3>Order Details</h3>

            <div className="os-detail-row">
              <span className="os-detail-label">Order Date</span>
              <span>{orderDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
            <div className="os-detail-row">
              <span className="os-detail-label">Estimated Delivery</span>
              <span className="os-detail-green">{estimatedDelivery.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
            <div className="os-detail-row">
              <span className="os-detail-label">Shipping</span>
              <span>{order.shipping.label}</span>
            </div>
            <div className="os-detail-row">
              <span className="os-detail-label">Payment</span>
              <span>{order.payment.label}</span>
            </div>

            <div className="os-divider" />

            <div className="os-detail-row">
              <span className="os-detail-label">Ship To</span>
              <span>{order.address.fullName}, {order.address.city}</span>
            </div>
            <div className="os-address-full">
              {order.address.street}, {order.address.city}, {order.address.state} – {order.address.pincode}
            </div>

            <div className="os-divider" />

            <div className="os-detail-row">
              <span>Subtotal</span>
              <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="os-detail-row">
              <span>Shipping</span>
              <span>{order.shippingCost === 0 ? "Free" : `₹${order.shippingCost.toLocaleString('en-IN')}`}</span>
            </div>
            <div className="os-divider" />
            <div className="os-detail-row os-total-row">
              <span>Total Paid</span>
              <span>₹{order.total.toLocaleString('en-IN')}</span>
            </div>
          </section>
        </div>

        {/* ── CTA buttons ── */}
        <section className="os-actions">
          <Link to="/offers" className="os-primary-btn">
            Continue Shopping <ArrowRight size={16} />
          </Link>
          <Link to="/" className="os-ghost-btn">Back to Home</Link>
        </section>
      </main>
    </div>
  );
}
