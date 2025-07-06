"use client";

import Link from "next/link";
import { Ad } from "../../../types";
import VideoPlayer from "../../../components/VideoPlayer";

interface AdDetailClientProps {
  ad: Ad;
  relatedAds: Ad[];
}

export default function AdDetailClient({
  ad,
  relatedAds,
}: AdDetailClientProps) {
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
