"use client";

import { useState, useEffect, useRef } from "react";
import AdCard from "../components/AdCard";
import BrandFilter from "../components/BrandFilter";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import VideoPlayer from "../components/VideoPlayer";

interface Ad {
  id: string;
  video_link: string;
  spot_products: string;
  brand_name: string;
  spot_language: string;
  brand_parent_name: string;
  spot_description: string;
  year: string;
  featured?: boolean;
}

interface Brand {
  name: string;
  count: number;
}

export default function Home() {
  // State variables
  const [ads, setAds] = useState<Ad[]>([]);
  const [featuredAd, setFeaturedAd] = useState<Ad | null>(null);
  const [randomAd, setRandomAd] = useState<Ad | null>(null);
  const [showingRandom, setShowingRandom] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const featuredAdsRef = useRef<HTMLDivElement>(null);

  // Filter options
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [languages, setLanguages] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [heroAds, setHeroAds] = useState<Ad[]>([]);

  // Function to pick a random ad
  const getRandomAd = () => {
    if (ads.length === 0) return null;

    // Filter out the current random ad and featured ad to avoid duplicates
    const availableAds = ads.filter(
      (ad) =>
        ad.id !== randomAd?.id &&
        ad.id !== featuredAd?.id &&
        !heroAds.some((heroAd) => heroAd.id === ad.id),
    );

    if (availableAds.length === 0) {
      // If no other ads available, just pick from all ads
      const randomIndex = Math.floor(Math.random() * ads.length);
      return ads[randomIndex];
    }

    const randomIndex = Math.floor(Math.random() * availableAds.length);
    return availableAds[randomIndex];
  };

  // Handle showing a random ad
  const handleRandomAdClick = () => {
    const newRandomAd = getRandomAd();
    if (newRandomAd) {
      setRandomAd(newRandomAd);
      setShowingRandom(true);

      // Clear any active filters to show the random ad prominently
      setSelectedBrand(null);
      setSelectedLanguage(null);
      setSelectedYear(null);
      setSearchTerm("");

      // Scroll to the random ad section with a slight delay for state update
      setTimeout(() => {
        if (featuredAdsRef.current) {
          featuredAdsRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  // Auto rotate hero ads
  useEffect(() => {
    if (heroAds.length > 0) {
      const interval = setInterval(() => {
        setHeroIndex((prev) => (prev + 1) % heroAds.length);
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [heroAds]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/ads");
        if (!res.ok) {
          throw new Error("Failed to fetch ads");
        }
        const data = await res.json();

        // Set the ads data
        setAds(data);

        // Select 3 featured ads for hero rotation
        const featuredAds = data
          .filter((ad: Ad) => ad.featured === true)
          .slice(0, 3);

        // If we don't have 3 featured ads, add some popular ones
        if (featuredAds.length < 3) {
          const popularAds = data
            .filter((ad: Ad) => !ad.featured)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3 - featuredAds.length);

          setHeroAds([...featuredAds, ...popularAds]);
        } else {
          setHeroAds(featuredAds);
        }

        // Set the first featured ad
        setFeaturedAd(featuredAds[0] || data[0]);

        // Extract unique brands and count
        const brandMap = data.reduce(
          (acc: { [key: string]: number }, ad: Ad) => {
            if (!acc[ad.brand_name]) {
              acc[ad.brand_name] = 0;
            }
            acc[ad.brand_name]++;
            return acc;
          },
          {},
        );

        const brandList = Object.entries(brandMap).map(([name, count]) => ({
          name,
          count: count as number,
        }));

        // Sort brands alphabetically
        brandList.sort((a, b) => a.name.localeCompare(b.name));
        setBrands(brandList);

        // Extract unique languages
        const uniqueLanguages = Array.from(
          new Set(data.map((ad: Ad) => ad.spot_language)),
        ).filter(Boolean) as string[];
        setLanguages(uniqueLanguages);

        // Extract unique years
        const uniqueYears = Array.from(
          new Set(data.map((ad: Ad) => ad.year)),
        ).filter(Boolean) as string[];
        setYears(uniqueYears.sort((a, b) => Number(b) - Number(a))); // Sort years in descending order
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  // Filter ads based on selected filters and search term
  const filteredAds = ads.filter((ad) => {
    const brandMatch = !selectedBrand || ad.brand_name === selectedBrand;
    const languageMatch =
      !selectedLanguage || ad.spot_language === selectedLanguage;
    const yearMatch = !selectedYear || ad.year === selectedYear;
    const searchMatch =
      !searchTerm ||
      ad.brand_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.spot_products.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.spot_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.brand_parent_name.toLowerCase().includes(searchTerm.toLowerCase());

    return brandMatch && languageMatch && yearMatch && searchMatch;
  });

  const handleBrandSelect = (brand: string | null) => {
    setSelectedBrand(brand);
    setShowingRandom(false);
  };

  const handleLanguageSelect = (language: string | null) => {
    setSelectedLanguage(language);
    setShowingRandom(false);
  };

  const handleYearSelect = (year: string | null) => {
    setSelectedYear(year);
    setShowingRandom(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowingRandom(false);
  };

  const resetFilters = () => {
    setSelectedBrand(null);
    setSelectedLanguage(null);
    setSelectedYear(null);
    setSearchTerm("");
    setShowingRandom(false);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      {/* Hero Banner with Rotating Featured Ads */}
      <section className="relative mb-16 lg:mb-20">
        {loading ? (
          <div className="animate-pulse bg-gray-800 rounded-2xl h-[60vh] sm:h-[70vh] lg:h-[80vh] mb-12"></div>
        ) : error ? (
          <div className="bg-red-900 text-white p-6 rounded-2xl mb-12">
            <p className="text-center text-lg">{error}</p>
          </div>
        ) : heroAds.length > 0 ? (
          <div className="hero-gradient relative h-[80vh] rounded-lg overflow-hidden cinema-border">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 z-0"
              >
                <div className="relative h-full">
                  <VideoPlayer
                    videoUrl={heroAds[heroIndex]?.video_link}
                    autoplay={true}
                    muted={true}
                    className="h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Hero Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
              <div className="container mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="max-w-3xl"
                >
                  <div className="glass-card p-6 rounded-lg">
                    <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-bebas-neue)] text-yellow-400 mb-2">
                      {heroAds[heroIndex]?.brand_name.toUpperCase()}
                    </h2>
                    <h3 className="text-xl md:text-2xl text-white mb-4 font-medium">
                      {heroAds[heroIndex]?.spot_products}
                    </h3>
                    <p className="text-gray-300 mb-6 line-clamp-3">
                      {heroAds[heroIndex]?.spot_description}
                    </p>
                    <div className="flex gap-4">
                      <Link
                        href={`/ads/${heroAds[heroIndex]?.id}`}
                        className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-md transition-colors inline-flex items-center gap-2"
                      >
                        <span>Watch Full Ad</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="dice-button px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-md transition-colors inline-flex items-center gap-2"
                        onClick={handleRandomAdClick}
                      >
                        <span className="dice-text">Random Ad</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Hero Navigation */}
                <div className="flex justify-center mt-8">
                  {heroAds.map((_, idx) => (
                    <button
                      key={idx}
                      className={`w-3 h-3 mx-1 rounded-full ${idx === heroIndex ? "bg-yellow-500" : "bg-gray-600"}`}
                      onClick={() => setHeroIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>

      {/* Featured/Random Ad Section */}
      <div ref={featuredAdsRef} id="featured">
        {loading ? (
          <div className="animate-pulse bg-gray-800 rounded-lg h-96 mb-12"></div>
        ) : error ? (
          <div className="bg-red-900 text-white p-4 rounded-lg mb-12">
            <p>{error}</p>
          </div>
        ) : showingRandom && randomAd ? (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 glass-card p-6 rounded-lg"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl md:text-5xl font-bold text-yellow-500 font-[family-name:var(--font-bebas-neue)] tracking-wide">
                🎲 RANDOM PICK
              </h2>
              <button
                onClick={() => handleRandomAdClick()}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg font-bold transition-colors flex items-center gap-2"
              >
                <span>Try Again</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                  <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                  <path d="M16 21h5v-5" />
                </svg>
              </button>
            </div>
            <div className="featured-player relative">
              <AdCard ad={randomAd} featured={true} />
            </div>
          </motion.section>
        ) : null}
      </div>      {/* Filter Controls */}
      <section className="mb-8 filter-section p-6 sm:p-8 rounded-2xl border border-gray-800">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-yellow-500 font-[family-name:var(--font-bebas-neue)] tracking-wide">
          FILTER COMMERCIALS
        </h2>
        
        <div className="space-y-6">
          {/* Search Bar */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Search</h3>
            <input
              type="text"
              placeholder="Search ads by brand, product, or description..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all"
            />
          </div>
          
          {/* Brand Filter */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">By Brand</h3>
            {!loading && !error && (
              <BrandFilter
                brands={brands}
                selectedBrand={selectedBrand}
                onSelectBrand={handleBrandSelect}
              />
            )}
          </div>
          
          {/* Language Filter */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">By Language</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleLanguageSelect(null)}
                className={`px-4 py-2 rounded-full font-bold text-sm transition-all hover:scale-105
                  ${
                    !selectedLanguage
                      ? "bg-yellow-600 text-white shadow-lg"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
              >
                All Languages
              </button>
              {languages.map((language) => (
                <button
                  key={language}
                  onClick={() => handleLanguageSelect(language)}
                  className={`px-4 py-2 rounded-full font-bold text-sm transition-all hover:scale-105
                    ${
                      selectedLanguage === language
                        ? "bg-yellow-600 text-white shadow-lg"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                >
                  {language.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          
          {/* Year Filter */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">By Year</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleYearSelect(null)}
                className={`px-4 py-2 rounded-full font-bold text-sm transition-all hover:scale-105
                  ${
                    !selectedYear
                      ? "bg-yellow-600 text-white shadow-lg"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
              >
                All Years
              </button>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => handleYearSelect(year)}
                  className={`px-4 py-2 rounded-full font-bold text-sm transition-all hover:scale-105
                    ${
                      selectedYear === year
                        ? "bg-yellow-600 text-white shadow-lg"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
          
          {/* Reset Filters */}
          {(selectedBrand || selectedLanguage || selectedYear || searchTerm) && (
            <div className="pt-4 border-t border-gray-700">
              <button
                onClick={resetFilters}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg"
              >
                🗑️ Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* All Ads Grid */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-500 font-[family-name:var(--font-bebas-neue)] tracking-wide">
          {filteredAds.length} COMMERCIALS{" "}
          {selectedBrand ? `BY ${selectedBrand.toUpperCase()}` : ""}
          {selectedLanguage ? ` IN ${selectedLanguage.toUpperCase()}` : ""}
          {selectedYear ? ` FROM ${selectedYear}` : ""}
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-800 rounded-lg h-64"
              ></div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-900 text-white p-4 rounded-lg">
            <p>{error}</p>
          </div>
        ) : (
          <>
            {filteredAds.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredAds
                  .filter((ad) => {
                    if (showingRandom) return ad.id !== randomAd?.id;
                    return ad.id !== featuredAd?.id;
                  })
                  .map((ad, index) => (
                    <motion.div
                      key={ad.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <AdCard ad={ad} />
                    </motion.div>
                  ))}
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
                <p className="text-xl text-gray-400">
                  No commercials found with these filters
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-bold transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
