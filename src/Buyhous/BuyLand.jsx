import React from "react";
import { Link } from "react-router-dom";
import "./BuyLand.css";

export default function BuyLand() {
  return (
    <div className="buyland-page">
      <section className="buyland-hero">
        <div className="buyland-overlay"></div>

        <div className="buyland-content">
          <span className="buyland-label">Luxury Land Investment</span>

          <h1>
            Find Premium Land <br />
            For Your Dream Estate
          </h1>

          <p>
            Explore exclusive residential, ranch, waterfront, and commercial
            land opportunities in high-value locations.
          </p>

          <div className="buyland-buttons">
            <Link to="/contact" className="btn-primary">
              Request Private Consultation
            </Link>

            <Link to="/" className="btn-outline">
              View Listings
            </Link>
          </div>
        </div>
      </section>

      <section className="buyland-info">
        <div className="buyland-info-card">
          <h3>Residential Land</h3>
          <p>
            Build your custom luxury home in peaceful and high-demand
            communities.
          </p>
        </div>

        <div className="buyland-info-card">
          <h3>Commercial Land</h3>
          <p>
            Discover strategic locations for business, retail, and development
            projects.
          </p>
        </div>

        <div className="buyland-info-card">
          <h3>Ranch & Acreage</h3>
          <p>
            Large private properties with space, privacy, and long-term value.
          </p>
        </div>
      </section>

      <section className="buyland-luxury">
        <div className="luxury-left">
          <span>Why Buy Land With Us</span>
          <h2>Secure The Right Property Before The Market Moves</h2>
          <p>
            Our real estate team helps buyers identify land with strong
            location value, future development potential, and lifestyle appeal.
          </p>

          <ul>
            <li>Private land opportunities</li>
            <li>Local market expertise</li>
            <li>Investment-focused guidance</li>
            <li>Personalized property search</li>
          </ul>

          <Link to="/contact" className="luxury-btn">
            Talk To An Agent
          </Link>
        </div>

        <div className="luxury-right">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
            alt="Luxury land"
          />
        </div>
      </section>
    </div>
  );
}