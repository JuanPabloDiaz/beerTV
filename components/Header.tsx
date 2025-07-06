"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-md shadow-2xl" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="group flex items-center">
            <motion.div whileHover={{ scale: 1.05 }} className="relative">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white">
                <span className="text-yellow-500 group-hover:text-yellow-400 transition-colors">
                  BEER
                </span>
                <span className="relative inline-block">
                  TV
                  <span className="absolute -top-1 -right-2 text-xs text-yellow-500">
                    ™
                  </span>
                </span>
              </h1>
              <motion.div
                className="absolute -bottom-2 h-1 bg-yellow-500"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-lg font-medium text-white hover:text-yellow-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href="#featured"
              className="text-lg font-medium text-white hover:text-yellow-400 transition-colors"
            >
              Featured
            </Link>
            <Link
              href="#all-ads"
              className="text-lg font-medium text-white hover:text-yellow-400 transition-colors"
            >
              All Ads
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0.8 }}
            whileHover={{ scale: 1.05, opacity: 1 }}
            className="hidden md:block glass-card px-4 py-2 rounded-full"
          >
            <p className="text-sm md:text-base font-medium">
              <span className="text-yellow-500 font-bold">PRIME TIME</span>{" "}
              COMMERCIALS
            </p>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
