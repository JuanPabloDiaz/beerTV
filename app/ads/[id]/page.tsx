"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import VideoPlayer from "../../../components/VideoPlayer";

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

interface PageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function AdDetail({ params }: PageProps) {
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedAds, setRelatedAds] = useState<Ad[]>([]);

  useEffect(() => {
    const fetchAdDetails = async () => {
      try {
        setLoading(true);
        // Fetch the specific ad details
        const res = await fetch(`/api/ads/${params.id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch ad details");
        }
        const data = await res.json();
        setAd(data);

        // Fetch related ads by the same brand
        const relatedRes = await fetch(
          `/api/ads?brand=${encodeURIComponent(data.brand_name)}`,
        );
        if (relatedRes.ok) {
          const relatedData = await relatedRes.json();
          // Filter out the current ad and limit to 3 related ads
          setRelatedAds(
            relatedData
              .filter((relatedAd: Ad) => relatedAd.id !== data.id)
              .slice(0, 3),
          );
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchAdDetails();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-800 rounded w-1/3"></div>
          <div className="h-96 bg-gray-800 rounded"></div>
          <div className="h-24 bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !ad) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-900 text-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error || "Ad not found"}</p>
          <Link
            href="/"
            className="mt-4 inline-block bg-yellow-600 text-white px-6 py-2 rounded-lg font-bold"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center text-yellow-500 hover:text-yellow-400 mb-6 group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 transform transition-transform group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to All Commercials
      </Link>

      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-800">
        <div className="aspect-video">
          <VideoPlayer
            videoUrl={ad.video_link}
            title={`${ad.brand_name} - ${ad.spot_products}`}
            className="w-full h-full"
          />
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-500 font-[family-name:var(--font-bebas-neue)] tracking-wide">
              {ad.brand_name}
            </h1>
            <div className="mt-2 md:mt-0 px-4 py-2 bg-gray-800 rounded-full font-bold text-gray-300">
              {ad.year}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-1">
              {ad.spot_products}
            </h2>
            <p className="text-gray-400">
              <span className="font-medium">{ad.brand_parent_name}</span> •
              Language: <span className="uppercase">{ad.spot_language}</span>
            </p>
          </div>

          <div className="border-t border-gray-800 pt-6 mb-6">
            <h3 className="text-xl font-bold text-white mb-3">
              About this Commercial
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {ad.spot_description}
            </p>
          </div>

          {relatedAds.length > 0 && (
            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-xl font-bold text-white mb-4">
                More from {ad.brand_name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {relatedAds.map((relatedAd) => (
                  <Link
                    href={`/ads/${relatedAd.id}`}
                    key={relatedAd.id}
                    className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors"
                  >
                    <h4 className="font-bold text-white mb-1">
                      {relatedAd.spot_products}
                    </h4>
                    <p className="text-gray-400 text-sm mb-2">
                      {relatedAd.year}
                    </p>
                    <p className="text-gray-300 line-clamp-2 text-sm">
                      {relatedAd.spot_description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-500 transition-colors"
            >
              View All Commercials
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
