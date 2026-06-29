import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
   <section>
  <footer className="relative overflow-hidden bg-slate-950 text-white">
    {/* BACKGROUND IMAGE */}
    <div
      className="absolute inset-0 bg-cover bg-center opacity-30"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80')",
      }}
    />

    {/* OVERLAY */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/95 to-blue-950/90" />

    {/* GOLD LINE */}
    <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />

    {/* CONTENT */}
    <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:py-20">
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        {/* BRAND */}
        <div className="lg:col-span-1">
          <div className="mb-5 flex items-center gap-4">
            <img
              src="/logo-Duane.jpg"
              alt="Duane Sells Logo"
              className="h-14 w-14 rounded-full border border-amber-500/50 object-cover shadow-lg shadow-amber-500/10"
            />

            <div>
              <h2 className="font-serif text-2xl font-bold tracking-wide text-white">
                DUANE SELLS
              </h2>
              <p className="text-xs font-semibold tracking-[0.25em] text-amber-400">
                REAL ESTATE
              </p>
            </div>
          </div>

          <p className="max-w-sm text-sm leading-7 text-slate-300">
            Helping clients buy and sell luxury homes, estates, and premium
            properties across Georgia with trusted local expertise.
          </p>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="mb-6 font-serif text-xl font-semibold text-white">
            Contact Us
          </h3>

          <div className="space-y-4 text-sm text-slate-300">
            <a
              href="https://www.google.com/maps/search/?api=1&query=1010+Village+Park+Lane+Suite+100+Greensboro+GA+30642"
              target="_blank"
              rel="noreferrer"
              className="flex gap-3 transition hover:text-amber-400"
            >
              <i className="ri-map-pin-line mt-1 text-amber-400"></i>
              <span>
                1010 Village Park Lane, Suite 100
                <br />
                Greensboro, GA 30642
              </span>
            </a>

            <a
              href="tel:+17703140104"
              className="flex items-center gap-3 transition hover:text-amber-400"
            >
              <i className="ri-phone-line text-amber-400"></i>
              <span>(770) 314-0104</span>
            </a>

            <a
              href="mailto:info@houseduane.com"
              className="flex items-center gap-3 transition hover:text-amber-400"
            >
              <i className="ri-mail-line text-amber-400"></i>
              <span>info@houseduane.com</span>
            </a>
          </div>
        </div>

        {/* USEFUL LINKS */}
        <div>
          <h3 className="mb-6 font-serif text-xl font-semibold text-white">
            Useful Links
          </h3>

          <div className="grid grid-cols-1 gap-3 text-sm text-slate-300">
            <Link to="/" className="transition hover:translate-x-1 hover:text-amber-400">
              Home
            </Link>

            <Link to="/buyhome" className="transition hover:translate-x-1 hover:text-amber-400">
              Luxury Listings
            </Link>

            <Link to="/contact" className="transition hover:translate-x-1 hover:text-amber-400">
              Contact Us
            </Link>

            <Link to="/agent" className="transition hover:translate-x-1 hover:text-amber-400">
              Agent Profile
            </Link>

            <Link to="/login" className="mt-2 text-xs text-slate-500 transition hover:text-slate-300">
              Admin Portal
            </Link>
          </div>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="mb-4 font-serif text-xl font-semibold text-white">
            Get New Listings
          </h3>

          <p className="mb-5 text-sm leading-6 text-slate-300">
            Subscribe to receive exclusive property updates, market news, and
            luxury home opportunities.
          </p>

          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 transition focus:border-amber-400 focus:bg-white/15"
            />

            <button className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:from-amber-400 hover:to-amber-500 active:scale-95">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="mt-14 border-t border-white/10 pt-6">
        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
          {/* SOCIAL */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">
              Follow us:
            </span>

            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:border-amber-400 hover:bg-amber-400 hover:text-slate-950"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:border-amber-400 hover:bg-amber-400 hover:text-slate-950"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* COPYRIGHT */}
          <p className="text-center text-sm text-slate-400">
            © {new Date().getFullYear()} DUANE SELLS Real Estate. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</section>
  );
}
