export default function Duane() {
  return (
    <>
      <main className="agent-profile">

        {/* ================= HERO ================= */}
        <section className="agent-hero">
          <img
            src="/sells-Duane.jpeg"
            alt="Duane Sells - Real Estate Executive"
            className="agent-img"
            loading="lazy"
          />

          <div className="agent-info">
            <h1>Duane Sells</h1>
            <h3>Operations Director | Real Estate Executive</h3>

            <p className="agent-highlight">
              Over 30 years of leadership in Commercial & Residential Real Estate,
              development, and institutional operations management.
            </p>

            {/* CONTACT BUTTON */}
            <a
              href="https://riverrockoconee.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn"
            >
              Contact Duane
            </a>
          </div>
        </section>

        {/* ================= ABOUT ================= */}
        <section className="agent-section">
          <h2>Professional Summary</h2>

          <p>
            Duane Sells serves in an operations leadership role with extensive
            experience in institutional development, real estate operations, and
            compliance management.
          </p>

          <p>
            His work includes site management, architectural coordination,
            facilities oversight, lease structuring, and regulatory compliance
            across multiple commercial and residential properties.
          </p>
        </section>

        {/* ================= EXPERIENCE ================= */}
        <section className="agent-section">
          <h2>Experience & Achievements</h2>

          <ul className="agent-list">
            <li>30+ Years in the Real Estate Industry</li>
            <li>Built over 5,000 homes</li>
            <li>Developed 15,000+ residential lots</li>
            <li>Former State Director – Home Builders Association of Georgia</li>
            <li>Leadership roles across construction & development companies</li>
          </ul>
        </section>

        {/* ================= PROPERTY GALLERY ================= */}
        <section className="agent-section">
          <h2>Featured Properties</h2>

          <div className="property-gallery">
            <img src="/house1.png" alt="Featured Property 1" loading="lazy" />
            <img src="/house2.png" alt="Featured Property 2" loading="lazy" />
            <img src="/house3.png" alt="Featured Property 3" loading="lazy" />
            <img src="/house4.png" alt="Featured Property 4" loading="lazy" />
            <img src="/house5.png" alt="Featured Property 5" loading="lazy" />
            <img src="/house6.png" alt="Featured Property 6" loading="lazy" />
          </div>
        </section>

      </main>

      {/* ================= FOOTER ================= */}

    </>
  );
}