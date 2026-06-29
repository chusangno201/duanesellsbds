import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function BuyHome() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Client-side filtering states
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  // Gallery modal states
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryTitle, setGalleryTitle] = useState("");
  const [touchStartX, setTouchStartX] = useState(null);

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

  // Lấy danh sách ảnh: hỗ trợ cột images jsonb, ảnh object {url,name}, ảnh dạng string, và dữ liệu cũ image/image_name
  const getListingImages = (item) => {
    let rawImages = [];

    if (Array.isArray(item?.images)) {
      rawImages = item.images;
    } else if (typeof item?.images === "string") {
      try {
        const parsed = JSON.parse(item.images);
        rawImages = Array.isArray(parsed) ? parsed : [];
      } catch {
        rawImages = [];
      }
    }

    const normalizedImages = rawImages
      .map((img, index) => {
        if (typeof img === "string") {
          return {
            url: img,
            name: `image-${index + 1}`,
          };
        }

        return {
          url: img?.url || img?.publicUrl || img?.src || "",
          name: img?.name || img?.image_name || `image-${index + 1}`,
        };
      })
      .filter((img) => img.url);

    if (normalizedImages.length > 0) {
      return normalizedImages;
    }

    if (item?.image) {
      return [
        {
          url: item.image,
          name: item.image_name || "main-image",
        },
      ];
    }

    return [];
  };

  const openGallery = (property, startIndex = 0) => {
    const images = getListingImages(property);

    if (images.length === 0) return;

    setGalleryImages(images);
    setGalleryIndex(startIndex);
    setGalleryTitle(property.title || "Property photos");
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
    setGalleryImages([]);
    setGalleryIndex(0);
    setGalleryTitle("");
    setTouchStartX(null);
  };

  const goToPrevImage = () => {
    setGalleryIndex((current) =>
      current === 0 ? galleryImages.length - 1 : current - 1
    );
  };

  const goToNextImage = () => {
    setGalleryIndex((current) =>
      current === galleryImages.length - 1 ? 0 : current + 1
    );
  };

  // Keyboard: ESC để đóng, mũi tên trái/phải để lướt ảnh
  useEffect(() => {
    if (!galleryOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeGallery();
      }

      if (event.key === "ArrowLeft") {
        goToPrevImage();
      }

      if (event.key === "ArrowRight") {
        goToNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [galleryOpen, galleryImages.length]);

  // Helper functions to generate deterministic details based on property ID
  const getBeds = (id) => (id % 3) + 3; // 3, 4, or 5 beds
  const getBaths = (id) => (id % 2) === 0 ? 3.5 : 4.5; // 3.5 or 4.5 baths
  const getSqft = (id) => ((id % 5) * 450) + 2800; // 2800 to 4600 sqft

  // Filter listings based on search query, city, and price range
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const title = p.title || "";
      const address = p.address || "";
      const price = Number(p.price) || 0;

      const matchesSearch =
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCity =
        cityFilter === "" ||
        address.toLowerCase().includes(cityFilter.toLowerCase());

      let matchesPrice = true;
      if (priceFilter === "under-1.5m") {
        matchesPrice = price < 1500000;
      } else if (priceFilter === "1.5m-3m") {
        matchesPrice = price >= 1500000 && price <= 3000000;
      } else if (priceFilter === "over-3m") {
        matchesPrice = price > 3000000;
      }

      return matchesSearch && matchesCity && matchesPrice;
    });
  }, [properties, searchQuery, cityFilter, priceFilter]);

  const activeGalleryImage = galleryImages[galleryIndex];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* LUXURY BANNER */}
      <section className="relative bg-slate-900 text-white py-24 px-6 md:px-12 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent" />

        <div className="relative max-w-7xl mx-auto z-10 text-center md:text-left">
          <span className="text-amber-500 uppercase tracking-widest text-xs font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Exclusive Listings
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mt-4 tracking-wide leading-tight">
            Find Your <span className="font-semibold text-amber-400">Luxury</span>{" "}
            Dream Home
          </h1>
          <p className="text-slate-300 mt-4 max-w-xl text-lg font-light leading-relaxed">
            Browse our hand-picked portfolio of premium real estate, luxury
            estates, and lakeside properties across Georgia.
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
            <p className="text-sm text-slate-500 mt-4">
              Loading exclusive estates...
            </p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 px-4 text-center bg-white rounded-2xl border border-slate-100 shadow-sm max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4 border border-slate-100">
              <i className="ri-home-line text-3xl"></i>
            </div>
            <h2 className="text-2xl font-serif font-medium text-slate-800 mb-2">
              No Matching Properties
            </h2>
            <p className="text-slate-500 max-w-md">
              We couldn't find any properties matching your current filters.
              Please adjust your criteria or check back later.
            </p>
          </div>
        ) : (
          <div>
            <p className="text-slate-500 text-sm mb-6 font-medium">
              Showing {filteredProperties.length} luxury{" "}
              {filteredProperties.length === 1 ? "property" : "properties"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => {
                const beds = getBeds(property.id);
                const baths = getBaths(property.id);
                const sqft = getSqft(property.id);
                const propertyImages = getListingImages(property);
                const mainImage = propertyImages[0]?.url;

                return (
                  <article
                    key={property.id}
                    className="group bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
                  >
                    {/* Property Image & Badge */}
                    <button
                      type="button"
                      onClick={() => openGallery(property, 0)}
                      className="relative block w-full overflow-hidden aspect-[4/3] bg-slate-100 text-left focus:outline-none focus:ring-4 focus:ring-amber-400/40"
                      aria-label={`View photos for ${property.title}`}
                    >
                      {mainImage ? (
                        <img
                          src={mainImage}
                          alt={property.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
                          No image
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                      <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-amber-400 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-amber-500/20">
                        For Sale
                      </span>

                      <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-900 shadow-lg backdrop-blur">
                        <i className="ri-image-line text-amber-600"></i>
                        Click to view photos
                      </span>

                      {propertyImages.length > 1 && (
                        <span className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                          +{propertyImages.length - 1} more
                        </span>
                      )}
                    </button>

                    {/* Card Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-2xl font-bold text-slate-900 font-sans tracking-tight mb-2">
                          ${Number(property.price || 0).toLocaleString()}
                        </p>

                        <h2 className="text-xl font-serif text-slate-800 font-semibold mb-2 group-hover:text-amber-600 transition-colors line-clamp-1">
                          {property.title}
                        </h2>

                        <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-4">
                          <i className="ri-map-pin-line text-amber-500"></i>
                          <span className="truncate">{property.address}</span>
                        </p>

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

      {/* IMAGE GALLERY MODAL */}
      {galleryOpen && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-md">
          <div
            className="absolute inset-0"
            onClick={closeGallery}
            aria-hidden="true"
          />

          <div className="relative z-10 flex h-full w-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-4 md:px-8">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
                  Property Gallery
                </p>
                <h3 className="truncate text-lg font-bold text-white md:text-2xl">
                  {galleryTitle}
                </h3>
              </div>

              <button
                type="button"
                onClick={closeGallery}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-slate-950"
                aria-label="Close gallery"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            {/* Main image */}
            <div
              className="relative flex flex-1 items-center justify-center px-3 py-4 md:px-10"
              onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchStartX === null) return;

                const touchEndX = e.changedTouches[0].clientX;
                const diff = touchStartX - touchEndX;

                if (Math.abs(diff) > 50) {
                  if (diff > 0) {
                    goToNextImage();
                  } else {
                    goToPrevImage();
                  }
                }

                setTouchStartX(null);
              }}
            >
              {galleryImages.length > 1 && (
                <button
                  type="button"
                  onClick={goToPrevImage}
                  className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-amber-500 hover:text-slate-950 md:left-8 md:h-14 md:w-14"
                  aria-label="Previous photo"
                >
                  <i className="ri-arrow-left-s-line text-3xl"></i>
                </button>
              )}

              <div className="relative max-h-full w-full max-w-6xl overflow-hidden rounded-2xl bg-black shadow-2xl">
                {activeGalleryImage?.url ? (
                  <img
                    src={activeGalleryImage.url}
                    alt={`${galleryTitle} ${galleryIndex + 1}`}
                    className="mx-auto max-h-[68vh] w-full object-contain"
                  />
                ) : (
                  <div className="flex h-[60vh] items-center justify-center text-white/60">
                    No image
                  </div>
                )}

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-sm font-bold text-white backdrop-blur">
                  {galleryIndex + 1} / {galleryImages.length}
                </div>
              </div>

              {galleryImages.length > 1 && (
                <button
                  type="button"
                  onClick={goToNextImage}
                  className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-amber-500 hover:text-slate-950 md:right-8 md:h-14 md:w-14"
                  aria-label="Next photo"
                >
                  <i className="ri-arrow-right-s-line text-3xl"></i>
                </button>
              )}
            </div>

            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="border-t border-white/10 bg-slate-950/80 px-4 py-4">
                <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto pb-1">
                  {galleryImages.map((img, index) => (
                    <button
                      type="button"
                      key={`${img.url}-${index}`}
                      onClick={() => setGalleryIndex(index)}
                      className={`h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition md:h-24 md:w-36 ${
                        index === galleryIndex
                          ? "border-amber-400 opacity-100"
                          : "border-white/10 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={`${galleryTitle} thumbnail ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
