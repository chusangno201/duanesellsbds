import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formMsg, setFormMsg] = useState("I am interested in this property and would like to request more information.");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setProperty(data);
    } catch (err) {
      console.error("Lỗi khi tải chi tiết bất động sản:", err.message);
      setError(err.message || "Property not found.");
    } finally {
      setLoading(false);
    }
  };

  // Helper functions to generate deterministic details based on property ID
  const getBeds = (idNum) => (idNum % 3) + 3; // 3, 4, or 5 beds
  const getBaths = (idNum) => (idNum % 2) === 0 ? 3.5 : 4.5; // 3.5 or 4.5 baths
  const getSqft = (idNum) => ((idNum % 5) * 450) + 2800; // 2800 to 4600 sqft
  const getYearBuilt = (idNum) => 2015 + (idNum % 8); // 2015 - 2022
  const getGarage = (idNum) => 2 + (idNum % 2); // 2 or 3 cars

  // Generator for rich luxury descriptions based on the property title
  const generateDescription = (title, address) => {
    return [
      `Welcome to ${title || "this exceptional luxury estate"}, situated in the highly coveted neighborhood of ${address || "Greensboro, Georgia"}. Designed with uncompromising quality and an eye for sophisticated elegance, this property stands as a true architectural masterpiece, blending classic elegance with state-of-the-art modern comforts.`,
      `The magnificent open floor plan draws you in, featuring soaring double-height ceilings, floor-to-ceiling custom windows that flood the home with natural light, and premium European oak floors running throughout. At the heart of the residence is a gourmet chef's kitchen, fully equipped with professional-grade appliances, custom cabinetry, a generous marble island, and an expansive walk-in pantry. The master suite is a private sanctuary, complete with a cozy fireplace, a boutique-style walk-in closet, and a spa-inspired en-suite bathroom featuring a freestanding soaking tub and dual vanity.`,
      `Step outside to discover an exceptional outdoor living oasis. The carefully landscaped grounds offer a serene resort-like experience, featuring an expansive covered stone terrace, an outdoor kitchen and bar, and a heated infinity-edge pool that blends seamlessly into the scenic views. Perfect for grand entertaining or private relaxation, this luxury property offers an unparalleled living experience.`
    ];
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    
    // Simulate sending message to agent
    setTimeout(() => {
      setFormSubmitting(false);
      setFormSuccess(true);
      setFormName("");
      setFormEmail("");
      setFormPhone("");
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-40">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
        <p className="text-sm text-slate-500 mt-4 font-medium">Loading property details...</p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-40 px-6 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4 border border-red-100">
          <i className="ri-error-warning-line text-3xl"></i>
        </div>
        <h2 className="text-2xl font-serif font-semibold text-slate-800 mb-2">Property Not Found</h2>
        <p className="text-slate-500 max-w-md mb-6">{error || "The property you are looking for does not exist or has been removed."}</p>
        <Link to="/buyhome" className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-amber-600 hover:text-slate-950 transition">
          <i className="ri-arrow-left-line"></i>
          Back to Listings
        </Link>
      </div>
    );
  }

  const idNum = Number(property.id) || 1;
  const beds = getBeds(idNum);
  const baths = getBaths(idNum);
  const sqft = getSqft(idNum);
  const yearBuilt = getYearBuilt(idNum);
  const garage = getGarage(idNum);
  const descriptionParagraphs = generateDescription(property.title, property.address);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* NAVIGATION HEADER BAR */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            to="/buyhome" 
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-amber-600 font-semibold transition"
          >
            <i className="ri-arrow-left-line text-lg"></i>
            Back to All Listings
          </Link>
          <div className="text-xs text-slate-400 font-medium">
            Property ID: #{property.id}
          </div>
        </div>
      </div>

      {/* HERO GALLERY BANNER */}
      <section className="relative h-[450px] md:h-[550px] bg-slate-900 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        
        {/* Title Overlay Info */}
        <div className="absolute inset-x-0 bottom-0 text-white p-6 md:p-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-md">
                Luxury Estate
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold mt-4 tracking-wide leading-tight drop-shadow-md">
                {property.title}
              </h1>
              <p className="text-slate-300 text-sm md:text-base flex items-center gap-1.5 mt-3 font-medium drop-shadow-sm">
                <i className="ri-map-pin-line text-amber-400"></i>
                {property.address}
              </p>
            </div>
            
            <div className="bg-slate-900/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-700/50 self-start md:self-end">
              <span className="text-slate-400 text-xs uppercase tracking-wider block font-semibold">Asking Price</span>
              <span className="text-3xl md:text-4xl font-bold text-amber-400 tracking-tight">
                ${property.price?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SPECIFICATIONS GRID */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            
            <div className="flex flex-col items-center justify-center p-2">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 mb-2 border border-slate-100">
                <i className="ri-hotel-bed-line text-xl"></i>
              </div>
              <span className="text-slate-500 text-xs font-medium uppercase">Bedrooms</span>
              <span className="text-slate-800 text-lg font-bold mt-1">{beds} Beds</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 mb-2 border border-slate-100">
                <i className="ri-shower-line text-xl"></i>
              </div>
              <span className="text-slate-500 text-xs font-medium uppercase">Bathrooms</span>
              <span className="text-slate-800 text-lg font-bold mt-1">{baths} Baths</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 mb-2 border border-slate-100">
                <i className="ri-ruler-2-line text-xl"></i>
              </div>
              <span className="text-slate-500 text-xs font-medium uppercase">Square Feet</span>
              <span className="text-slate-800 text-lg font-bold mt-1">{sqft.toLocaleString()} sqft</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 mb-2 border border-slate-100">
                <i className="ri-car-line text-xl"></i>
              </div>
              <span className="text-slate-500 text-xs font-medium uppercase">Garage</span>
              <span className="text-slate-800 text-lg font-bold mt-1">{garage} Car Space</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 mb-2 border border-slate-100">
                <i className="ri-calendar-line text-xl"></i>
              </div>
              <span className="text-slate-500 text-xs font-medium uppercase">Year Built</span>
              <span className="text-slate-800 text-lg font-bold mt-1">{yearBuilt}</span>
            </div>

          </div>
        </div>
      </section>

      {/* BODY DETAILS & CONTACT FORM */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* LEFT 2 COLUMNS: DESCRIPTION & DETAILS */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Description */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-serif text-slate-800 font-semibold mb-6 pb-3 border-b border-slate-100">
                Property Overview
              </h2>
              <div className="space-y-6 text-slate-600 font-light leading-relaxed text-base">
                {descriptionParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Amenity Features */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-serif text-slate-800 font-semibold mb-6 pb-3 border-b border-slate-100">
                Premium Features & Amenities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-slate-700">
                  <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100">
                    <i className="ri-checkbox-circle-line text-lg"></i>
                  </span>
                  <span className="text-sm font-medium">Smart Home Automation System</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100">
                    <i className="ri-checkbox-circle-line text-lg"></i>
                  </span>
                  <span className="text-sm font-medium">Private Wine Cellar & Bar</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100">
                    <i className="ri-checkbox-circle-line text-lg"></i>
                  </span>
                  <span className="text-sm font-medium">Heated Infinity Edge Swimming Pool</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100">
                    <i className="ri-checkbox-circle-line text-lg"></i>
                  </span>
                  <span className="text-sm font-medium">Professional Chef's Kitchen</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100">
                    <i className="ri-checkbox-circle-line text-lg"></i>
                  </span>
                  <span className="text-sm font-medium">Panoramic Water / Mountain Views</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100">
                    <i className="ri-checkbox-circle-line text-lg"></i>
                  </span>
                  <span className="text-sm font-medium">Expansive Covered Stone Patio</span>
                </div>
              </div>
            </div>

            {/* Embedded Location Map */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm overflow-hidden">
              <h2 className="text-2xl font-serif text-slate-800 font-semibold mb-6 pb-3 border-b border-slate-100">
                Location & Neighborhood
              </h2>
              <div className="rounded-xl overflow-hidden h-[350px] border border-slate-200 shadow-inner">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(property.address || "Georgia, USA")}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Property Location Map"
                ></iframe>
              </div>
            </div>

          </div>

          {/* RIGHT 1 COLUMN: FLOATING CONTACT CARD */}
          <div className="lg:sticky lg:top-36 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src="/logo-Duane.jpg" 
                  alt="Agent Duane" 
                  className="w-14 h-14 rounded-full object-cover border-2 border-amber-500"
                />
                <div>
                  <h3 className="font-bold font-serif text-lg tracking-wide">Duane Sells</h3>
                  <span className="text-xs text-amber-400 font-semibold">Real Estate Specialist</span>
                </div>
              </div>

              <div className="h-px bg-slate-800 mb-6" />

              <h4 className="text-lg font-serif font-medium text-amber-400 mb-4">
                Schedule a Private Tour
              </h4>

              {formSuccess ? (
                <div className="bg-green-950/40 border border-green-800/80 rounded-xl p-6 text-center animate-in fade-in duration-200">
                  <div className="w-12 h-12 bg-green-900/50 rounded-full flex items-center justify-center text-green-400 mx-auto mb-4 border border-green-500/20">
                    <i className="ri-checkbox-circle-fill text-2xl"></i>
                  </div>
                  <h5 className="font-semibold text-green-400 text-base mb-2">Request Submitted!</h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Thank you for your interest. Duane's private client team will reach out to you within the next 24 hours to schedule your tour.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="John Doe"
                      className="bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl px-4 py-3 text-sm outline-none text-white transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl px-4 py-3 text-sm outline-none text-white transition-all"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="(770) 555-0199"
                      className="bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl px-4 py-3 text-sm outline-none text-white transition-all"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Message</label>
                    <textarea
                      rows="3"
                      value={formMsg}
                      onChange={(e) => setFormMsg(e.target.value)}
                      className="bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl px-4 py-3 text-sm outline-none text-white transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-3.5 px-4 rounded-xl transition shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 active:scale-95"
                  >
                    {formSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-950"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <span>Submit Request</span>
                        <i className="ri-send-plane-line"></i>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Direct Contact info card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center">
              <span className="text-slate-400 text-xs font-semibold uppercase block mb-1">Direct Hotline</span>
              <a href="tel:7703140104" className="text-xl font-bold text-slate-800 hover:text-amber-600 transition">
                (770) - 314 - 0104
              </a>
              <span className="text-slate-400 text-[10px] block mt-1">Available 24/7 for Private Showings</span>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
