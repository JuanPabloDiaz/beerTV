"use client";

import { useState, useEffect } from "react";
import AdCard from "../components/AdCard";
import BrandFilter from "../components/BrandFilter";
import Link from "next/link";

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
  const [ads, setAds] = useState<Ad[]>([]);
  const [featuredAd, setFeaturedAd] = useState<Ad | null>(null);
  const [randomAd, setRandomAd] = useState<Ad | null>(null);
  const [showingRandom, setShowingRandom] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  
  // New filter options
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [languages, setLanguages] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);

  // Function to pick a random ad
  const getRandomAd = () => {
    if (ads.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * ads.length);
    return ads[randomIndex];
  };

  // Handle showing a random ad
  const handleRandomAdClick = () => {
    const newRandomAd = getRandomAd();
    setRandomAd(newRandomAd);
    setShowingRandom(true);
  };

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

        // Find a featured ad
        const featured = data.find((ad: Ad) => ad.featured === true) || data[0];
        setFeaturedAd(featured);

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

        setBrands(brandList);
        
        // Extract unique languages
        const uniqueLanguages = Array.from(
          new Set(data.map((ad: Ad) => ad.spot_language))
        ).filter(Boolean) as string[];
        setLanguages(uniqueLanguages);
        
        // Extract unique years
        const uniqueYears = Array.from(
          new Set(data.map((ad: Ad) => ad.year))
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

  // Filter ads based on selected filters
  const filteredAds = ads.filter((ad) => {
    const brandMatch = !selectedBrand || ad.brand_name === selectedBrand;
    const languageMatch = !selectedLanguage || ad.spot_language === selectedLanguage;
    const yearMatch = !selectedYear || ad.year === selectedYear;
    return brandMatch && languageMatch && yearMatch;
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

  const resetFilters = () => {
    setSelectedBrand(null);
    setSelectedLanguage(null);
    setSelectedYear(null);
    setShowingRandom(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Featured or Random Ad */}
      {loading ? (
        <div className="animate-pulse bg-gray-800 rounded-lg h-96 mb-12"></div>
      ) : error ? (
        <div className="bg-red-900 text-white p-4 rounded-lg mb-12">
          <p>{error}</p>
        </div>
      ) : showingRandom && randomAd ? (
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 font-[family-name:var(--font-bebas-neue)] tracking-wide">
              RANDOM COMMERCIAL
            </h2>
            <button 
              onClick={() => handleRandomAdClick()}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-bold transition-colors"
            >
              Show Another Random Ad
            </button>
          </div>
          <div className="featured-ad-container">
            <AdCard ad={randomAd} featured={true} />
          </div>
        </section>
      ) : featuredAd ? (
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 font-[family-name:var(--font-bebas-neue)] tracking-wide">
              FEATURED COMMERCIAL
            </h2>
            <button 
              onClick={() => handleRandomAdClick()}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-bold transition-colors"
            >
              Show Random Ad
            </button>
          </div>
          <div className="featured-ad-container">
            <AdCard ad={featuredAd} featured={true} />
          </div>
        </section>
      ) : null}

      {/* Filter Controls */}
      <section className="mb-8 bg-gray-900 p-6 rounded-lg border border-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-500 font-[family-name:var(--font-bebas-neue)] tracking-wide">
          FILTER COMMERCIALS
        </h2>
        
        <div className="space-y-4">
          {/* Brand Filter */}
          <div>
            <h3 className="text-xl font-bold text-white mb-2">By Brand</h3>
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
            <h3 className="text-xl font-bold text-white mb-2">By Language</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleLanguageSelect(null)}
                className={`px-4 py-2 rounded-full font-bold text-sm transition-all
                  ${
                    !selectedLanguage
                      ? "bg-yellow-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
              >
                All Languages
              </button>
              {languages.map((language) => (
                <button
                  key={language}
                  onClick={() => handleLanguageSelect(language)}
                  className={`px-4 py-2 rounded-full font-bold text-sm transition-all
                    ${
                      selectedLanguage === language
                        ? "bg-yellow-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                >
                  {language}
                </button>
              ))}
            </div>
          </div>
          
          {/* Year Filter */}
          <div>
            <h3 className="text-xl font-bold text-white mb-2">By Year</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleYearSelect(null)}
                className={`px-4 py-2 rounded-full font-bold text-sm transition-all
                  ${
                    !selectedYear
                      ? "bg-yellow-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
              >
                All Years
              </button>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => handleYearSelect(year)}
                  className={`px-4 py-2 rounded-full font-bold text-sm transition-all
                    ${
                      selectedYear === year
                        ? "bg-yellow-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
          
          {/* Reset Filters */}
          {(selectedBrand || selectedLanguage || selectedYear) && (
            <div className="mt-4">
              <button
                onClick={resetFilters}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* All Ads Grid */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-500 font-[family-name:var(--font-bebas-neue)] tracking-wide">
          {filteredAds.length} COMMERCIALS {selectedBrand ? `BY ${selectedBrand.toUpperCase()}` : ""}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAds
                  .filter((ad) => {
                    if (showingRandom) return ad.id !== randomAd?.id;
                    return ad.id !== featuredAd?.id;
                  })
                  .map((ad) => (
                    <AdCard key={ad.id} ad={ad} />
                  ))}
              </div>
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
