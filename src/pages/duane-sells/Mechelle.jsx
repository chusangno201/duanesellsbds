import React from 'react'

export default function Mechelle() {
  return (
    <main className="agent-profile">

      {/* ================= HERO ================= */}
      <section className="agent-hero no-image">
         <img
            src="/"
            alt="/"
            className="agent-img"
            loading="lazy"
          />
        <div className="agent-info">
          <h1>Michelle Gilley</h1>
          <h3>Real Estate Agent | Land & Development Specialist</h3>

          <p className="agent-highlight">
            Over 20 years of experience in residential, land acquisition, and development strategy.
          </p>

          <a href="/contact" className="contact-btn">
            Contact Michelle
          </a>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="agent-section">
        <h2>Professional Background</h2>

        <p>
          Michelle Gilley is a seasoned real estate professional with over 20 years of experience in residential, development, and land acquisition. Now as a licensed real estate agent in the state of Georgia, she brings a rare combination of hands-on building knowledge and strategic real estate expertise to every client she serves.
        </p>

        <p>
          Michelle specializes in land, land assemblage, residential, and commercial opportunities, working closely with developers, builders, investors, and long-time landowners. Her deep understanding of property potential—paired with her certifications in NPDES Levels 1A, 1B, and Level II through the Georgia Water and Soil Commission—gives her clients a distinct advantage when navigating complex land and development decisions.
        </p>
      </section>

      {/* ================= EXPERTISE ================= */}
      <section className="agent-section">
        <h2>Expertise & Strengths</h2>

        <p>
          What truly sets Michelle apart is her ability to research and interpret county ordinances, zoning regulations, and rezone opportunities. She is highly skilled at navigating the challenges that often come with land and development—from entitlement hurdles to uncovering a property’s highest and best use within counties.
        </p>

        <p>
          Her proactive, solutions-driven approach allows clients to move forward with clarity and confidence, even in complex situations.
        </p>
      </section>

      {/* ================= APPROACH ================= */}
      <section className="agent-section">
        <h2>Client Approach</h2>

        <p>
          At the heart of Michelle’s work is a genuine love for people and a deep commitment to serving others. Known for her problem-solving mindset, she pairs her industry expertise with compassion, care, and a true desire to help those she works with succeed.
        </p>

        <p>
          She believes real estate is not just about property—it’s about people—and she takes pride in guiding her clients with integrity, patience, and a service-first approach.
        </p>
      </section>

      {/* ================= CLIENT SUPPORT ================= */}
      <section className="agent-section">
        <h2>Client Support</h2>

        <p>
          Whether assisting a family with a home, guiding a builder through a project, or helping a landowner determine next steps, Michelle is dedicated to helping clients fully understand their options and maximize the value of their property while feeling confident and supported every step of the way.
        </p>
      </section>

      {/* ================= GOAL ================= */}
      <section className="agent-section">
        <h2>Mission</h2>

        <p>
          Her goal is simple: to be a trusted resource who helps clients make informed, confident decisions while achieving the best possible outcome.
        </p>
      </section>

    </main>
  )
}
