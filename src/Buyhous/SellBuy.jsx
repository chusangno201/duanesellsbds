import React from "react";
import { Link } from "react-router-dom";
import "./SellBuy.css";

export default function SellBuy() {
  return (
    <div className="sellbuy-page">
      <section className="sellbuy-hero">
        <div className="sellbuy-overlay"></div>

        <div className="sellbuy-content">
          <span className="sellbuy-label">Luxury Real Estate Service</span>

          <h1>
            Sell Smart. <br />
            Buy Better.
          </h1>

          <p>
            Whether you are selling your current home or buying your next dream
            property, our real estate team provides a private, professional, and
            luxury experience from start to finish.
          </p>

          <div className="sellbuy-buttons">
            <Link to="/contact" className="sellbuy-btn-primary">
              Schedule Consultation
            </Link>

            <Link to="/buyhome" className="sellbuy-btn-outline">
              Explore Homes
            </Link>
          </div>
        </div>
      </section>

      <section className="sellbuy-services">
        <div className="sellbuy-card">
          <span>01</span>
          <h3>Sell Your Home</h3>
          <p>
            Get expert pricing, premium marketing, and strong buyer exposure for
            your property.
          </p>
        </div>

        <div className="sellbuy-card">
          <span>02</span>
          <h3>Buy Your Next Home</h3>
          <p>
            Discover luxury homes, private listings, and properties that match
            your lifestyle.
          </p>
        </div>

        <div className="sellbuy-card">
          <span>03</span>
          <h3>Full-Service Guidance</h3>
          <p>
            From valuation to closing, our team supports every step with clear
            strategy.
          </p>
        </div>
      </section>

      <section className="sellbuy-process">
        <div className="sellbuy-process-img">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
            alt="Luxury home"
          />
        </div>

        <div className="sellbuy-process-content">
          <span>Our Process</span>
          <h2>A Seamless Experience For Sellers And Buyers</h2>

          <p>
            We combine market knowledge, luxury presentation, negotiation
            strategy, and personal guidance to help you make the right real
            estate move.
          </p>

          <div className="process-list">
            <div>
              <strong>01</strong>
              <p>Property consultation and market review</p>
            </div>

            <div>
              <strong>02</strong>
              <p>Pricing strategy and listing preparation</p>
            </div>

            <div>
              <strong>03</strong>
              <p>Private showings and qualified buyer matching</p>
            </div>

            <div>
              <strong>04</strong>
              <p>Negotiation, contract, and closing support</p>
            </div>
          </div>

          <Link to="/contact" className="sellbuy-gold-btn">
            Contact An Agent
          </Link>
        </div>
      </section>
    </div>
  );
}