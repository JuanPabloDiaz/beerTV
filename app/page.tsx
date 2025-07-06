"use client";

import { useState, useEffect } from "react";
import AdCard from "../components/AdCard";
import BrandFilter from "../components/BrandFilter";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);

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
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  // Filter ads by selected brand
  const filteredAds = selectedBrand
    ? ads.filter((ad) => ad.brand_name === selectedBrand)
    : ads;

  const handleBrandSelect = (brand: string | null) => {
    setSelectedBrand(brand);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Featured Ad */}
      {loading ? (
        <div className="animate-pulse bg-gray-800 rounded-lg h-96 mb-12"></div>
      ) : error ? (
        <div className="bg-red-900 text-white p-4 rounded-lg mb-12">
          <p>{error}</p>
        </div>
      ) : featuredAd ? (
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-500 font-[family-name:var(--font-bebas-neue)] tracking-wide">
            FEATURED COMMERCIAL
          </h2>
          <div className="featured-ad-container">
            <AdCard ad={featuredAd} featured={true} />
          </div>
        </section>
      ) : null}

      {/* Brand Filter */}
      <section className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-500 font-[family-name:var(--font-bebas-neue)] tracking-wide">
          BROWSE BY BRAND
        </h2>
        {!loading && !error && (
          <BrandFilter
            brands={brands}
            selectedBrand={selectedBrand}
            onSelectBrand={handleBrandSelect}
          />
        )}
      </section>

      {/* All Ads Grid */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-500 font-[family-name:var(--font-bebas-neue)] tracking-wide">
          ALL COMMERCIALS
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
                  .filter((ad) => ad.id !== featuredAd?.id)
                  .map((ad) => (
                    <AdCard key={ad.id} ad={ad} />
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-400">
                  No commercials found for this brand
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
