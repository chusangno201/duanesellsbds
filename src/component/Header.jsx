import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section>
        {/* ===== TOP BAR ===== */}
        <div className="topbar">
          <div className="topbar-container">
            {/* LOGO */}
            <div className="topbar-logo">
              <img src="/logo-Duane.jpg" alt="logo" />
            </div>

            {/* CONTACT */}
            <div className="topbar-contact">
              <span>
                <i className="ri-phone-fill"></i>
                (770)-314-0104
              </span>

              <span>
                <i className="ri-mail-fill"></i>
                info@houseduane.com
              </span>
            </div>

            {/* SOCIAL */}
            <div className="topbar-social">
              <span>Find us on:</span>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-facebook"></i>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>

            {/* BUTTONS */}
            <div className="topbar-buttons">
              <Link to="/duane-sells">
                <button className="btn red">TENANT PORTAL</button>
              </Link>

              <Link to="/contact">
                <button className="btn red outline">CONTACT US</button>
              </Link>
            </div>

            {/* HAMBURGER */}
            <div
              className="hamburger"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
              }}
            >
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
        </div>
        <div className="menu-bar">
          <nav>
            <Link to="/BuyHome">
              BUY A HOME<span>+</span>
            </Link>
            <Link to="/">
              SELL A HOME <span>+</span>
            </Link>
            <Link to="/">
              BUY LAND <span>+</span>
            </Link>
            <Link to="/">
              SELL BUY <span>+</span>
            </Link>
          </nav>
        </div>
        {/* ===== MOBILE MENU ===== */}
        {open && (
          <div className="mobile-menu">
            <nav>
              <Link to="/Buyhome" onClick={() => setOpen(false)}>
                BUY A HOME
              </Link>
              <Link to="/" onClick={() => setOpen(false)}>
                SELL A HOME
              </Link>
              <Link to="/" onClick={() => setOpen(false)}>
               CONTACR US
              </Link>
            
            </nav>
          </div>
        )}
      </section>
    </>
  );
}
