import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import '../App.css';

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-landing">
        <div className="hero-content">
          <h1>Welcome to the Future of Commerce platform </h1>
          <p className="hero-subtitle">
            Experience blazing-fast shopping powered by containerized microservices and edge computing.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn-primary large-btn">
              Explore Catalog <ArrowRight size={20} />
            </Link>
            <Link to="/login" className="btn-secondary large-btn">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="feature-card">
          <Zap size={40} className="feature-icon" />
          <h3>Lightning Fast</h3>
          <p>Our distributed product microservice ensures zero latency while browsing our extensive inventory.</p>
        </div>
        <div className="feature-card">
          <Shield size={40} className="feature-icon" />
          <h3>Secure Ecosystem</h3>
          <p>Your data is processed securely through decoupled, isolated environments orchestrated via Docker.</p>
        </div>
        <div className="feature-card">
          <Globe size={40} className="feature-icon" />
          <h3>Global Scale</h3>
          <p>Seamlessly deploying to the edge on Vercel utilizing automated GitHub Action pipelines.</p>
        </div>
      </section>
    </div>
  );
}
