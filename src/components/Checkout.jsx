import Navbar from "./Navbar";
import "../styles/checkout.css";
import {
  MapPin, CreditCard, Truck, ShieldCheck, ChevronRight, Lock, ArrowLeft, GraduationCap, BadgePercent, X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const SHIPPING_OPTIONS = [
  { id: "standard", label: "Standard Delivery", days: "5–7 business days", price: 99 },
  { id: "express", label: "Express Delivery", days: "2–3 business days", price: 249 },
  { id: "overnight", label: "Overnight Delivery", days: "Next business day", price: 499 },
];

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI", desc: "Google Pay, PhonePe, Paytm" },
  { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay" },
  { id: "netbanking", label: "Net Banking", desc: "All major banks" },
  { id: "cod", label: "Cash on Delivery", desc: "Pay when you receive" },
];

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState(1); // 1=address, 2=shipping, 3=payment, 4=review
  const [address, setAddress] = useState({
    fullName: "", phone: "", street: "", city: "", state: "", pincode: "",
  });
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [selectedPayment, setSelectedPayment] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardData, setCardData] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [placing, setPlacing] = useState(false);

  // Student discount
  const [studentId, setStudentId] = useState("");
  const [studentApplied, setStudentApplied] = useState(false);
  const [studentError, setStudentError] = useState("");
  const STUDENT_DISCOUNT_PERCENT = 15;

  const applyStudentDiscount = () => {
    setStudentError("");
    // Validate: must be at least 6 chars alphanumeric
    if (studentId.trim().length < 6) {
      setStudentError("Please enter a valid Student ID (min 6 characters).");
      return;
    }
    setStudentApplied(true);
  };

  const removeStudentDiscount = () => {
    setStudentApplied(false);
    setStudentId("");
    setStudentError("");
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    if (stored.length === 0) {
      navigate("/cart");
      return;
    }
    setCart(stored);
  }, [navigate]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const studentDiscount = studentApplied ? Math.round(subtotal * STUDENT_DISCOUNT_PERCENT / 100) : 0;
  const discountedSubtotal = subtotal - studentDiscount;
  const shippingCost = discountedSubtotal >= 2000
    ? 0
    : SHIPPING_OPTIONS.find((s) => s.id === selectedShipping)?.price || 99;
  const total = discountedSubtotal + shippingCost;

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const isAddressValid = Object.values(address).every((v) => v.trim() !== "");

  const placeOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      const order = {
        id: "TA" + Date.now().toString(36).toUpperCase(),
        items: cart,
        address,
        shipping: SHIPPING_OPTIONS.find((s) => s.id === selectedShipping),
        payment: PAYMENT_METHODS.find((p) => p.id === selectedPayment),
        subtotal,
        studentDiscount,
        studentId: studentApplied ? studentId : null,
        shippingCost,
        total,
        date: new Date().toISOString(),
      };
      // Save order and clear cart
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));
      localStorage.setItem("cart", "[]");
      navigate("/order-success", { state: { order } });
    }, 2000);
  };

  const stepLabels = ["Address", "Shipping", "Payment", "Review"];

  return (
    <div className="home-page">
      <Navbar />
      <main className="co-page">
        {/* ── Breadcrumb ── */}
        <div className="co-breadcrumb">
          <Link to="/cart" className="co-back"><ArrowLeft size={16} /> Back to Cart</Link>
        </div>

        {/* ── Stepper ── */}
        <div className="co-stepper">
          {stepLabels.map((label, i) => (
            <div key={i} className={`co-step ${step > i + 1 ? "done" : ""} ${step === i + 1 ? "active" : ""}`}>
              <div className="co-step-num">{step > i + 1 ? "✓" : i + 1}</div>
              <span className="co-step-label">{label}</span>
              {i < 3 && <ChevronRight size={14} className="co-step-arrow" />}
            </div>
          ))}
        </div>

        <div className="co-layout">
          {/* ── Left: Form Area ── */}
          <div className="co-form-area">

            {/* Step 1: Address */}
            {step === 1 && (
              <div className="co-card" key="address">
                <div className="co-card-header">
                  <MapPin size={20} /> <h2>Shipping Address</h2>
                </div>
                <div className="co-form-grid">
                  <div className="co-field full">
                    <label>Full Name</label>
                    <input name="fullName" placeholder="John Doe" value={address.fullName} onChange={handleAddressChange} />
                  </div>
                  <div className="co-field full">
                    <label>Phone Number</label>
                    <input name="phone" placeholder="+91 98765 43210" value={address.phone} onChange={handleAddressChange} />
                  </div>
                  <div className="co-field full">
                    <label>Street Address</label>
                    <input name="street" placeholder="123, MG Road, Apartment 4B" value={address.street} onChange={handleAddressChange} />
                  </div>
                  <div className="co-field">
                    <label>City</label>
                    <input name="city" placeholder="Bangalore" value={address.city} onChange={handleAddressChange} />
                  </div>
                  <div className="co-field">
                    <label>State</label>
                    <input name="state" placeholder="Karnataka" value={address.state} onChange={handleAddressChange} />
                  </div>
                  <div className="co-field">
                    <label>PIN Code</label>
                    <input name="pincode" placeholder="560001" value={address.pincode} onChange={handleAddressChange} />
                  </div>
                </div>
                <button className="co-next-btn" disabled={!isAddressValid} onClick={() => setStep(2)}>
                  Continue to Shipping <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Step 2: Shipping */}
            {step === 2 && (
              <div className="co-card" key="shipping">
                <div className="co-card-header">
                  <Truck size={20} /> <h2>Shipping Method</h2>
                </div>
                {subtotal >= 2000 && (
                  <div className="co-free-ship-banner">🎉 You qualify for FREE standard shipping!</div>
                )}
                <div className="co-options">
                  {SHIPPING_OPTIONS.map((opt) => (
                    <label
                      className={`co-option ${selectedShipping === opt.id ? "selected" : ""}`}
                      key={opt.id}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        value={opt.id}
                        checked={selectedShipping === opt.id}
                        onChange={() => setSelectedShipping(opt.id)}
                      />
                      <div className="co-option-info">
                        <span className="co-option-label">{opt.label}</span>
                        <span className="co-option-desc">{opt.days}</span>
                      </div>
                      <span className="co-option-price">
                        {subtotal >= 2000 && opt.id === "standard" ? "Free" : `₹${opt.price}`}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="co-btn-row">
                  <button className="co-back-btn" onClick={() => setStep(1)}>← Back</button>
                  <button className="co-next-btn" onClick={() => setStep(3)}>
                    Continue to Payment <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="co-card" key="payment">
                <div className="co-card-header">
                  <CreditCard size={20} /> <h2>Payment Method</h2>
                </div>
                <div className="co-options">
                  {PAYMENT_METHODS.map((pm) => (
                    <label
                      className={`co-option ${selectedPayment === pm.id ? "selected" : ""}`}
                      key={pm.id}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={pm.id}
                        checked={selectedPayment === pm.id}
                        onChange={() => setSelectedPayment(pm.id)}
                      />
                      <div className="co-option-info">
                        <span className="co-option-label">{pm.label}</span>
                        <span className="co-option-desc">{pm.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>

                {/* UPI field */}
                {selectedPayment === "upi" && (
                  <div className="co-pay-details">
                    <div className="co-field full">
                      <label>UPI ID</label>
                      <input placeholder="yourname@upi" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
                    </div>
                  </div>
                )}

                {/* Card fields */}
                {selectedPayment === "card" && (
                  <div className="co-pay-details">
                    <div className="co-field full">
                      <label>Card Number</label>
                      <input placeholder="1234 5678 9012 3456" value={cardData.number} onChange={(e) => setCardData({ ...cardData, number: e.target.value })} />
                    </div>
                    <div className="co-field full">
                      <label>Name on Card</label>
                      <input placeholder="John Doe" value={cardData.name} onChange={(e) => setCardData({ ...cardData, name: e.target.value })} />
                    </div>
                    <div className="co-form-grid">
                      <div className="co-field">
                        <label>Expiry</label>
                        <input placeholder="MM/YY" value={cardData.expiry} onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })} />
                      </div>
                      <div className="co-field">
                        <label>CVV</label>
                        <input type="password" placeholder="•••" value={cardData.cvv} onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })} />
                      </div>
                    </div>
                  </div>
                )}

                <div className="co-btn-row">
                  <button className="co-back-btn" onClick={() => setStep(2)}>← Back</button>
                  <button className="co-next-btn" onClick={() => setStep(4)}>
                    Review Order <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div className="co-card" key="review">
                <div className="co-card-header">
                  <ShieldCheck size={20} /> <h2>Review Your Order</h2>
                </div>

                <div className="co-review-section">
                  <h4>Shipping Address</h4>
                  <p>{address.fullName}<br/>{address.street}<br/>{address.city}, {address.state} – {address.pincode}<br/>📞 {address.phone}</p>
                  <button className="co-edit-link" onClick={() => setStep(1)}>Edit</button>
                </div>

                <div className="co-review-section">
                  <h4>Shipping Method</h4>
                  <p>{SHIPPING_OPTIONS.find(s => s.id === selectedShipping)?.label} — {SHIPPING_OPTIONS.find(s => s.id === selectedShipping)?.days}</p>
                  <button className="co-edit-link" onClick={() => setStep(2)}>Edit</button>
                </div>

                <div className="co-review-section">
                  <h4>Payment</h4>
                  <p>{PAYMENT_METHODS.find(p => p.id === selectedPayment)?.label}</p>
                  {studentApplied && <p className="co-review-student">🎓 Student Discount ({STUDENT_DISCOUNT_PERCENT}%) — ID: {studentId}</p>}
                  <button className="co-edit-link" onClick={() => setStep(3)}>Edit</button>
                </div>

                <div className="co-review-items">
                  <h4>Items ({cart.reduce((s, i) => s + i.qty, 0)})</h4>
                  {cart.map((item) => (
                    <div className="co-review-item" key={item.name}>
                      <img src={item.image} alt={item.name} />
                      <div>
                        <span className="co-ri-name">{item.name}</span>
                        <span className="co-ri-qty">Qty: {item.qty}</span>
                      </div>
                      <span className="co-ri-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                {/* Student Offer */}
                <div className="co-student-section">
                  <div className="co-student-header">
                    <GraduationCap size={20} />
                    <div>
                      <h3>Student Offer</h3>
                      <p>Enter your Student ID Card number to get <strong>{STUDENT_DISCOUNT_PERCENT}% off</strong></p>
                    </div>
                  </div>

                  {studentApplied ? (
                    <div className="co-student-applied">
                      <BadgePercent size={18} />
                      <div className="co-student-applied-info">
                        <span className="co-student-applied-label">{STUDENT_DISCOUNT_PERCENT}% Student Discount Applied!</span>
                        <span className="co-student-applied-id">ID: {studentId}</span>
                        <span className="co-student-applied-save">You save ₹{studentDiscount.toLocaleString('en-IN')}</span>
                      </div>
                      <button className="co-student-remove" onClick={removeStudentDiscount}>
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="co-student-form">
                      <div className="co-student-input-wrap">
                        <input
                          className="co-student-input"
                          placeholder="Enter Student ID (e.g., STU2024001)"
                          value={studentId}
                          onChange={(e) => { setStudentId(e.target.value); setStudentError(""); }}
                        />
                        <button className="co-student-apply" onClick={applyStudentDiscount} disabled={!studentId.trim()}>
                          Apply
                        </button>
                      </div>
                      {studentError && <p className="co-student-error">{studentError}</p>}
                      <p className="co-student-note">Upload your ID proof during delivery for verification.</p>
                    </div>
                  )}
                </div>

                <div className="co-btn-row">
                  <button className="co-back-btn" onClick={() => setStep(3)}>← Back</button>
                  <button className="co-place-btn" onClick={placeOrder} disabled={placing}>
                    {placing ? (
                      <><span className="co-spinner" /> Processing...</>
                    ) : (
                      <><Lock size={16} /> Place Order — ₹{total.toLocaleString('en-IN')}</>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: Order Summary ── */}
          <aside className="co-summary">
            <h3>Order Summary</h3>
            <div className="co-summary-items">
              {cart.map((item) => (
                <div className="co-si" key={item.name}>
                  <div className="co-si-img"><img src={item.image} alt={item.name} /></div>
                  <div className="co-si-info">
                    <span className="co-si-name">{item.name}</span>
                    <span className="co-si-qty">Qty: {item.qty}</span>
                  </div>
                  <span className="co-si-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            <div className="co-divider" />
            <div className="co-s-row">
              <span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {studentApplied && (
              <div className="co-s-row co-s-discount">
                <span>🎓 Student ({STUDENT_DISCOUNT_PERCENT}%)</span>
                <span>−₹{studentDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="co-s-row">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? "Free" : `₹${shippingCost.toLocaleString('en-IN')}`}</span>
            </div>
            <div className="co-divider" />
            <div className="co-s-row co-s-total">
              <span>Total</span><span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <div className="co-secure-badge">
              <ShieldCheck size={14} /> Secure Checkout
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
