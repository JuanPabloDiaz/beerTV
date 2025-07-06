import React from "react";
import Link from "next/link";
import VideoPlayer from "./VideoPlayer";

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

interface AdCardProps {
  ad: Ad;
  featured?: boolean;
}

const AdCard: React.FC<AdCardProps> = ({ ad, featured = false }) => {
  return (
    <div
      className={`
        bg-gray-900 rounded-lg overflow-hidden shadow-xl transition-all
        hover:shadow-2xl hover:scale-[1.01] border border-gray-800
        ${featured ? "col-span-full lg:col-span-2 lg:row-span-2" : ""}
      `}
    >
      <Link href={`/ads/${ad.id}`} className="cursor-pointer">
        <div className="relative">
          <VideoPlayer
            videoUrl={ad.video_link}
            title={`${ad.brand_name} - ${ad.spot_products}`}
            className={
              featured ? "aspect-video" : "aspect-video sm:aspect-video"
            }
          />

          {featured && (
            <div className="absolute top-4 right-4 bg-yellow-600 text-white px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider">
              Featured
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-bold text-yellow-500 mb-1">
              {ad.brand_name}
            </h3>
            <span className="text-gray-400 text-sm">{ad.year}</span>
          </div>

          <div className="text-gray-400 text-sm mb-2">
            {ad.brand_parent_name} • {ad.spot_language.toUpperCase()}
          </div>

          <p className="text-gray-300 mt-2 line-clamp-3">
            {ad.spot_description}
          </p>

          <div className="mt-4 flex justify-between items-center">
            <span className="inline-block bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-300">
              {ad.spot_products}
            </span>

            <div className="text-yellow-500 font-bold">Watch Now →</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AdCard;
