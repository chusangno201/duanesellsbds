import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function BuyHome() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Client-side filtering states
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (err) {
      console.error("Lỗi khi tải danh sách nhà đất:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions to generate deterministic details based on property ID
  const getBeds = (id) => (id % 3) + 3; // 3, 4, or 5 beds
  const getBaths = (id) => (id % 2) === 0 ? 3.5 : 4.5; // 3.5 or 4.5 baths
  const getSqft = (id) => ((id % 5) * 450) + 2800; // 2800 to 4600 sqft

  // Filter listings based on search query, city, and price range
  const filteredProperties = properties.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = cityFilter === "" || p.address.toLowerCase().includes(cityFilter.toLowerCase());
    
    let matchesPrice = true;
    if (priceFilter === "under-1.5m") {
      matchesPrice = p.price < 1500000;
    } else if (priceFilter === "1.5m-3m") {
      matchesPrice = p.price >= 1500000 && p.price <= 3000000;
    } else if (priceFilter === "over-3m") {
      matchesPrice = p.price > 3000000;
    }

    return matchesSearch && matchesCity && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* LUXURY BANNER */}
      <section className="relative bg-slate-900 text-white py-24 px-6 md:px-12 overflow-hidden">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto z-10 text-center md:text-left">
          <span className="text-amber-500 uppercase tracking-widest text-xs font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Exclusive Listings
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mt-4 tracking-wide leading-tight">
            Find Your <span className="font-semibold text-amber-400">Luxury</span> Dream Home
          </h1>
          <p className="text-slate-300 mt-4 max-w-xl text-lg font-light leading-relaxed">
            Browse our hand-picked portfolio of premium real estate, luxury estates, and lakeside properties across Georgia.
          </p>
        </div>
      </section>

      {/* FILTER BAR SECTION */}
      <section className="bg-white border-b border-slate-200 sticky top-20 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <i className="ri-search-line text-lg"></i>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, location..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm text-slate-800"
              />
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Location Select */}
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm text-slate-700 bg-white focus:border-amber-500 transition-all cursor-pointer"
              >
                <option value="">All Locations</option>
                <option value="Atlanta">Atlanta</option>
                <option value="Alpharetta">Alpharetta</option>
                <option value="Acworth">Acworth</option>
                <option value="Greensboro">Greensboro</option>
                <option value="Oconee">Lake Oconee</option>
              </select>

              {/* Price Range Select */}
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm text-slate-700 bg-white focus:border-amber-500 transition-all cursor-pointer"
              >
                <option value="">Any Price</option>
                <option value="under-1.5m">Under $1.5M</option>
                <option value="1.5m-3m">$1.5M - $3.0M</option>
                <option value="over-3m">Over $3.0M</option>
              </select>

              {/* Reset Filters */}
              {(searchQuery || cityFilter || priceFilter) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setCityFilter("");
                    setPriceFilter("");
                  }}
                  className="px-4 py-2.5 text-sm font-semibold text-red-600 hover:text-red-700 transition"
                >
                  Clear Filters
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* PROPERTIES SECTION */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            <p className="text-sm text-slate-500 mt-4">Loading exclusive estates...</p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 px-4 text-center bg-white rounded-2xl border border-slate-100 shadow-sm max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4 border border-slate-100">
              <i className="ri-home-line text-3xl"></i>
            </div>
            <h2 className="text-2xl font-serif font-medium text-slate-800 mb-2">No Matching Properties</h2>
            <p className="text-slate-500 max-w-md">
              We couldn't find any properties matching your current filters. Please adjust your criteria or check back later.
            </p>
          </div>
        ) : (
          <div>
            {/* Results count */}
            <p className="text-slate-500 text-sm mb-6 font-medium">
              Showing {filteredProperties.length} luxury {filteredProperties.length === 1 ? "property" : "properties"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => {
                const beds = getBeds(property.id);
                const baths = getBaths(property.id);
                const sqft = getSqft(property.id);

                return (
                  <article
                    key={property.id}
                    className="group bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
                  >
                    {/* Property Image & Badge */}
                    <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                      
                      <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-amber-400 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-amber-500/20">
                        For Sale
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Price */}
                        <p className="text-2xl font-bold text-slate-900 font-sans tracking-tight mb-2">
                          ${property.price?.toLocaleString()}
                        </p>

                        {/* Title */}
                        <h2 className="text-xl font-serif text-slate-800 font-semibold mb-2 group-hover:text-amber-600 transition-colors line-clamp-1">
                          {property.title}
                        </h2>

                        {/* Address */}
                        <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-4">
                          <i className="ri-map-pin-line text-amber-500"></i>
                          <span className="truncate">{property.address}</span>
                        </p>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-3 gap-2 py-3.5 px-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 text-xs font-semibold mb-6">
                          <div className="flex items-center gap-1.5 justify-center border-r border-slate-200">
                            <i className="ri-hotel-bed-line text-slate-400 text-sm"></i>
                            <span>{beds} Beds</span>
                          </div>
                          <div className="flex items-center gap-1.5 justify-center border-r border-slate-200">
                            <i className="ri-shower-line text-slate-400 text-sm"></i>
                            <span>{baths} Baths</span>
                          </div>
                          <div className="flex items-center gap-1.5 justify-center">
                            <i className="ri-ruler-2-line text-slate-400 text-sm"></i>
                            <span>{sqft.toLocaleString()} Sq Ft</span>
                          </div>
                        </div>
                      </div>

                      {/* View Details Action */}
                      <Link 
                        to={`/buyhome/${property.id}`}
                        className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-amber-600 text-white hover:text-slate-950 font-bold py-3.5 px-4 rounded-xl transition-all duration-300 shadow-sm"
                      >
                        <span>View Details</span>
                        <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1"></i>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
