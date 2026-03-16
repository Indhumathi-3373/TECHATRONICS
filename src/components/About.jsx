import Navbar from "./Navbar";
import "../styles/about.css";
import { Cpu, Zap, Users, Truck, Shield, Headphones, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FEATURES = [
  { icon: Cpu,        title: "Quality Components",   desc: "Sourced from trusted manufacturers. Every part is individually tested before it reaches you." },
  { icon: Zap,        title: "Fast Processing",       desc: "Orders processed within 24 hours. Your project can't wait — and neither do we." },
  { icon: Truck,      title: "Reliable Shipping",     desc: "Nationwide delivery with real-time tracking. Free shipping on orders above ₹2,000." },
  { icon: Shield,     title: "Secure Checkout",       desc: "256-bit SSL encryption. Your payment information is always safe with us." },
  { icon: Users,      title: "Community Driven",      desc: "Join 10 000+ makers, students, and engineers building with TECHATRONICS." },
  { icon: Headphones, title: "24/7 Support",          desc: "Our support team is always here to help — via chat, email, or phone." },
];

const STATS = [
  { value: "10K+",  label: "Happy Customers" },
  { value: "500+",  label: "Products"        },
  { value: "24h",   label: "Processing"      },
  { value: "4.8★",  label: "Avg Rating"      },
];

const TIMELINE = [
  { year: "2019", text: "Founded as a tiny campus workshop helping students find parts." },
  { year: "2020", text: "Launched our online store — first 1 000 orders shipped." },
  { year: "2022", text: "Expanded to 500+ products; partnered with Arduino & Espressif." },
  { year: "2024", text: "Reached 10 000 customers. Opened our first physical lab-store." },
];

export default function About() {
  return (
    <div className="home-page">
      <Navbar />
      <main className="ab-page">
        {/* ── Hero ── */}
        <section className="ab-hero">
          <span className="ab-pill">ABOUT TECHATRONICS</span>
          <h1>Powering Innovation,<br />One Component at a Time</h1>
          <p className="ab-hero-sub">
            From hobbyists to engineers — we provide quality electronic components, 
            kits, and the knowledge to bring your ideas to life.
          </p>
          <div className="ab-hero-btns">
            <Link to="/offers" className="ab-primary-btn">
              Explore Products <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="ab-ghost-btn">Get in Touch</Link>
          </div>
        </section>

        {/* ── Stats strip ── */}
        <section className="ab-stats-strip">
          {STATS.map((s) => (
            <div className="ab-stat" key={s.label}>
              <span className="ab-stat-val">{s.value}</span>
              <span className="ab-stat-lbl">{s.label}</span>
            </div>
          ))}
        </section>

        {/* ── Features Grid ── */}
        <section className="ab-section">
          <h2 className="ab-section-title">Why Choose Us</h2>
          <div className="ab-features">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <div className="ab-feat" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="ab-feat-icon"><Icon size={24} /></div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Timeline / Story ── */}
        <section className="ab-section">
          <h2 className="ab-section-title">Our Journey</h2>
          <div className="ab-timeline">
            {TIMELINE.map((t, i) => (
              <div className="ab-tl-item" key={i} style={{ animationDelay: `${i * 0.12}s` }}>
                <div className="ab-tl-dot" />
                <div className="ab-tl-content">
                  <span className="ab-tl-year">{t.year}</span>
                  <p>{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA banner ── */}
        <section className="ab-cta">
          <h2>Ready to start building?</h2>
          <p>Browse hundreds of components handpicked for makers like you.</p>
          <Link to="/offers" className="ab-cta-btn">
            Shop Now <ArrowRight size={16} />
          </Link>
        </section>
      </main>
    </div>
  );
}
