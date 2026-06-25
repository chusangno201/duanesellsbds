import React from "react";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <section className="relative w-full min-h-[700px] flex items-center justify-center text-center overflow-hidden">
      
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')",
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl px-6 text-white">
        
        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
          Buy or Sell Your Property With Confidence
        </h2>

        <p className="text-white/80 text-lg leading-relaxed mb-10">
          Our experienced team helps homeowners and buyers achieve the best
          results through smart pricing strategies, strong market insights,
          and professional support every step of the way.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          
          <Link to="/contact">
            <button className="bg-red-500 hover:bg-red-600 transition px-10 py-4 rounded-full font-semibold text-white shadow-xl">
              WHAT’S MY HOME WORTH
            </button>
          </Link>

          <Link to="/contact">
            <button className="bg-white text-gray-900 hover:bg-gray-100 transition px-10 py-4 rounded-full font-semibold shadow-xl">
              FIND YOUR NEXT HOME
            </button>
          </Link>

        </div>
      </div>
    </section>
  );
}