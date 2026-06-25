import { Outlet } from "react-router-dom";
import Header from "../component/Header";

import Footer from "../component/Footer";

export default function Layout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      {/* GOOGLE MAP SECTION */}
      <div className="footer-map">
        <iframe
          src="https://www.google.com/maps?q=Atlanta,GA&output=embed"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      <Footer />
    </>
  );
}
