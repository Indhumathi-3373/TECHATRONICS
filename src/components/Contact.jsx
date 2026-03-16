import Navbar from "./Navbar";
import "../styles/contact.css";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    }, 1200);
  };

  return (
    <div className="home-page">
      <Navbar />
      <main className="ct-page">
        {/* ── Hero ── */}
        <section className="ct-hero">
          <span className="ct-pill">CONTACT US</span>
          <h1>Let's Talk</h1>
          <p className="ct-hero-sub">
            Questions about an order, product compatibility, or just want to say hi?
            We'd love to hear from you.
          </p>
        </section>

        {/* ── Quick Info Cards ── */}
        <section className="ct-cards">
          <div className="ct-card">
            <div className="ct-card-icon"><Mail size={22} /></div>
            <h4>Email Us</h4>
            <p>support@techatronics.com</p>
            <span className="ct-card-tag"><Clock size={12} /> Replies within 4 hours</span>
          </div>
          <div className="ct-card">
            <div className="ct-card-icon"><Phone size={22} /></div>
            <h4>Call Us</h4>
            <p>+1 (555) 123-4567</p>
            <span className="ct-card-tag"><Clock size={12} /> Mon–Sat, 9 AM – 6 PM</span>
          </div>
          <div className="ct-card">
            <div className="ct-card-icon"><MapPin size={22} /></div>
            <h4>Visit Us</h4>
            <p>123 Maker Street, Tech City</p>
            <span className="ct-card-tag"><Clock size={12} /> Walk-ins welcome</span>
          </div>
        </section>

        {/* ── Form Section ── */}
        <section className="ct-form-section">
          <div className="ct-form-header">
            <MessageSquare size={22} className="ct-form-header-icon" />
            <div>
              <h2>Send a Message</h2>
              <p>Fill in the details and we'll get back to you shortly.</p>
            </div>
          </div>

          {submitted ? (
            <div className="ct-success">
              <CheckCircle2 size={48} className="ct-success-icon" />
              <h3>Message Sent!</h3>
              <p>Thanks for reaching out. We'll respond within 24 hours.</p>
            </div>
          ) : (
            <form className="ct-form" onSubmit={handleSubmit}>
              <div className="ct-form-grid">
                <div className="ct-field">
                  <label htmlFor="ct-name">Name</label>
                  <input id="ct-name" type="text" name="name" placeholder="John Doe" required value={formData.name} onChange={handleChange} />
                </div>
                <div className="ct-field">
                  <label htmlFor="ct-email">Email</label>
                  <input id="ct-email" type="email" name="email" placeholder="john@example.com" required value={formData.email} onChange={handleChange} />
                </div>
              </div>
              <div className="ct-field">
                <label htmlFor="ct-subject">Subject</label>
                <input id="ct-subject" type="text" name="subject" placeholder="Order inquiry, product question..." required value={formData.subject} onChange={handleChange} />
              </div>
              <div className="ct-field">
                <label htmlFor="ct-message">Message</label>
                <textarea id="ct-message" name="message" placeholder="Tell us how we can help..." rows={5} required value={formData.message} onChange={handleChange} />
              </div>
              <button type="submit" className="ct-submit" disabled={sending}>
                {sending ? (
                  <><span className="ct-spinner" /> Sending...</>
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </button>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}
