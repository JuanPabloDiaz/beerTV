"use client";

import React, { useState } from "react";
import Link from "next/link";
import VideoPlayer from "./VideoPlayer";
import { motion } from "framer-motion";

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
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`
        video-hover-card glass-card rounded-xl overflow-hidden shadow-2xl border border-gray-800/50
        ${featured ? "col-span-full lg:col-span-2 lg:row-span-2" : ""}
        hover:border-yellow-500/30 transition-all duration-300
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: featured ? 1.02 : 1.03 }}
    >
      <Link href={`/ads/${ad.id}`} className="cursor-pointer block h-full">
        <div className="relative group">
          <motion.div
            className="relative overflow-hidden"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <VideoPlayer
              videoUrl={ad.video_link}
              title={`${ad.brand_name} - ${ad.spot_products}`}
              className={featured ? "aspect-video" : "aspect-video"}
              autoplay={isHovered}
              muted={true}
            />
            
            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
            
            {/* Cinematic border glow effect on hover */}
            <motion.div 
              className="absolute inset-0 rounded-xl border-2 border-transparent z-20"
              animate={isHovered ? { 
                borderColor: "rgba(234, 179, 8, 0.6)",
                boxShadow: "0 0 30px rgba(234, 179, 8, 0.3)"
              } : {}}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Enhanced Brand Logo Area */}
          <motion.div 
            className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-yellow-500/40 z-20"
            animate={isHovered ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className={`font-bold text-yellow-400 ${featured ? 'text-lg' : 'text-sm md:text-base'}`}>
              {ad.brand_name}
            </span>
          </motion.div>

          {/* Featured Badge */}
          {featured && (
            <motion.div 
              className="absolute top-4 right-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider z-20 shadow-lg"
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            >
              🏆 Featured
            </motion.div>
          )}

          {/* Play button overlay on hover */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-30"
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-yellow-500/90 rounded-full p-4 backdrop-blur-sm shadow-2xl"
              animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-black">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced content area */}
        <div className={`p-4 relative z-10 ${featured ? 'p-6' : 'p-4'}`}>
          <motion.div 
            className="flex justify-between items-start mb-3"
            animate={isHovered ? { y: -3 } : { y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className={`font-bold text-yellow-400 font-[family-name:var(--font-teko)] tracking-wide leading-tight ${featured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>
              {ad.brand_name.toUpperCase()}
              {ad.spot_products && ad.spot_products !== "NULL" && (
                <>
                  <span className="text-white mx-2">·</span>
                  <span className="text-white">{ad.spot_products}</span>
                </>
              )}
            </h3>
            <span className="text-gray-400 text-xs bg-black/60 px-2 py-1 rounded flex-shrink-0">
              {ad.year}
            </span>
          </motion.div>

          <div className="text-gray-300 text-sm mb-4 flex flex-wrap items-center gap-2">
            <span className="text-yellow-400 font-medium">{ad.brand_parent_name}</span>
            <span className="text-gray-500">•</span>
            <span className="bg-gray-800/80 text-xs px-2 py-1 rounded uppercase font-medium">
              {ad.spot_language}
            </span>
          </div>

          <motion.p 
            className={`text-gray-300 mb-4 ${featured ? 'text-base line-clamp-4' : 'text-sm line-clamp-3'}`}
            animate={isHovered ? { opacity: 1 } : { opacity: 0.9 }}
          >
            {ad.spot_description}
          </motion.p>

          {/* Action area */}
          <motion.div 
            className="flex justify-between items-center"
            animate={isHovered ? { opacity: 1, y: -2 } : { opacity: 0.8, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">
                Click to watch
              </span>
              <motion.span
                animate={isHovered ? { x: 4 } : { x: 0 }}
                transition={{ duration: 0.3 }}
                className="text-yellow-400"
              >
                →
              </motion.span>
            </div>
            
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="text-xs text-gray-400">Premium</span>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default AdCard;
