import React from "react";
import { Link } from "react-router-dom";
import "./SellHome.css";

export default function SellHome() {
  return (
    <div className="sellhome-page">
      <section className="sellhome-hero">
        <div className="sellhome-overlay"></div>

        <div className="sellhome-content">
          <span className="sellhome-label">Luxury Home Selling</span>

          <h1>
            Sell Your Home <br />
            With Confidence
          </h1>

          <p>
            Get expert pricing, premium marketing, professional presentation,
            and strong buyer exposure for your property.
          </p>

          <div className="sellhome-buttons">
            <Link to="/contact" className="sellhome-btn-primary">
              Get Home Valuation
            </Link>

            <Link to="/sellbuy" className="sellhome-btn-outline">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="sellhome-stats">
        <div>
          <h2>01</h2>
          <h3>Home Valuation</h3>
          <p>
            We review your property, location, market trends, and comparable
            sales to help you price correctly.
          </p>
        </div>

        <div>
          <h2>02</h2>
          <h3>Luxury Marketing</h3>
          <p>
            Professional photos, online exposure, targeted promotion, and strong
            listing presentation.
          </p>
        </div>

        <div>
          <h2>03</h2>
          <h3>Qualified Buyers</h3>
          <p>
            We help connect your home with serious buyers and guide you through
            negotiation.
          </p>
        </div>
      </section>

      <section className="sellhome-section">
        <div className="sellhome-image">
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
            alt="Luxury home selling"
          />
        </div>

        <div className="sellhome-text">
          <span>Our Selling Strategy</span>

          <h2>Designed To Help Your Property Stand Out</h2>

          <p>
            Selling a home is more than putting it on the market. We create a
            strategy that highlights your home, attracts the right buyers, and
            helps you move forward with confidence.
          </p>

          <ul>
            <li>Professional market analysis</li>
            <li>Luxury listing presentation</li>
            <li>Buyer qualification support</li>
            <li>Negotiation and closing guidance</li>
          </ul>

          <Link to="/contact" className="sellhome-gold-btn">
            Contact An Agent
          </Link>
        </div>
      </section>

      <section className="sellhome-cta">
        <div>
          <span>Ready To Sell?</span>
          <h2>Find Out What Your Home Is Worth Today</h2>
          <p>
            Start with a private consultation and receive guidance from our real
            estate team.
          </p>
        </div>

        <Link to="/contact">Schedule Consultation</Link>
      </section>
    </div>
  );
}