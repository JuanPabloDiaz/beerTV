"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
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
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Enhanced Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center text-yellow-500 hover:text-yellow-400 group transition-all duration-300"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              whileHover={{ x: -4 }}
              transition={{ duration: 0.2 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </motion.svg>
            <span className="text-lg font-semibold">Back to All Commercials</span>
          </Link>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl overflow-hidden shadow-2xl border border-gray-800/50"
        >
          {/* Video Section */}
          <div className="relative">
            <div className="aspect-video relative">
              <VideoPlayer
                videoUrl={ad.video_link}
                title={`${ad.brand_name} - ${ad.spot_products}`}
                className="w-full h-full rounded-t-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
            </div>
            
            {/* Video Overlay Info */}
            <motion.div 
              className="absolute bottom-6 left-6 right-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="glass-card p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/40 rounded-full text-yellow-400 text-sm font-bold">
                    {ad.brand_name}
                  </span>
                  <span className="text-gray-300 text-sm">{ad.year}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {ad.spot_products && ad.spot_products !== "NULL" ? ad.spot_products : ad.brand_name}
                </h1>
              </div>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8 lg:p-10">
            {/* Brand Info */}
            <motion.div 
              className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 font-[family-name:var(--font-bebas-neue)] tracking-wide mb-2">
                  {ad.brand_name.toUpperCase()}
                </h2>
                <div className="flex items-center gap-4 text-gray-300">
                  <span className="font-medium text-yellow-400">{ad.brand_parent_name}</span>
                  <span>•</span>
                  <span className="bg-gray-800/60 px-3 py-1 rounded-full text-sm uppercase font-bold">
                    {ad.spot_language}
                  </span>
                </div>
              </div>
              
              <motion.div 
                className="mt-4 md:mt-0 flex gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <button className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded-xl transition-all duration-300 shadow-lg">
                  <span className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    Save
                  </span>
                </button>
              </motion.div>
            </motion.div>

            {/* Description Section */}
            <motion.div 
              className="border-t border-gray-800/50 pt-8 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <line x1="10" y1="9" x2="8" y2="9"/>
                </svg>
                About this Commercial
              </h3>
              <div className="bg-gray-800/30 rounded-xl p-6">
                <p className={`text-gray-300 text-lg leading-relaxed transition-all duration-300 ${!showFullDescription && ad.spot_description.length > 200 ? 'line-clamp-3' : ''}`}>
                  {ad.spot_description}
                </p>
                {ad.spot_description.length > 200 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="mt-3 text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                  >
                    {showFullDescription ? 'Show Less' : 'Read More'}
                  </button>
                )}
              </div>
            </motion.div>

            {/* Commercial Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="bg-gray-800/30 rounded-xl p-4 text-center">
                <div className="text-yellow-400 text-2xl font-bold">{ad.year}</div>
                <div className="text-gray-400 text-sm">Year</div>
              </div>
              <div className="bg-gray-800/30 rounded-xl p-4 text-center">
                <div className="text-yellow-400 text-2xl font-bold">{ad.spot_language.toUpperCase()}</div>
                <div className="text-gray-400 text-sm">Language</div>
              </div>
              <div className="bg-gray-800/30 rounded-xl p-4 text-center">
                <div className="text-yellow-400 text-2xl font-bold">HD</div>
                <div className="text-gray-400 text-sm">Quality</div>
              </div>
              <div className="bg-gray-800/30 rounded-xl p-4 text-center">
                <div className="text-yellow-400 text-2xl font-bold">★★★★☆</div>
                <div className="text-gray-400 text-sm">Rating</div>
              </div>
            </motion.div>

            {/* Related Ads */}
            {relatedAds.length > 0 && (
              <motion.div 
                className="border-t border-gray-800/50 pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                  More from {ad.brand_name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedAds.map((relatedAd, index) => (
                    <motion.div
                      key={relatedAd.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <Link
                        href={`/ads/${relatedAd.id}`}
                        className="block glass-card rounded-xl p-5 hover:border-yellow-500/30 transition-all duration-300 group"
                      >
                        <h4 className="font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                          {relatedAd.spot_products && relatedAd.spot_products !== "NULL" 
                            ? relatedAd.spot_products 
                            : relatedAd.brand_name}
                        </h4>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-yellow-400 text-sm font-medium">{relatedAd.year}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-400 text-sm uppercase">{relatedAd.spot_language}</span>
                        </div>
                        <p className="text-gray-300 line-clamp-2 text-sm leading-relaxed">
                          {relatedAd.spot_description}
                        </p>
                        <div className="mt-3 flex items-center text-yellow-400 text-sm group-hover:translate-x-1 transition-transform">
                          <span>Watch now</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                            <path d="m9 18 6-6-6-6"/>
                          </svg>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div 
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <Link
                href="/"
                className="px-8 py-4 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-center"
              >
                View All Commercials
              </Link>
              <button className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-xl transition-all duration-300 border border-gray-600 hover:border-gray-500">
                Share Commercial
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
