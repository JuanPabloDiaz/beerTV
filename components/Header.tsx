import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-black border-b border-yellow-600 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link href="/" className="flex items-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white">
              <span className="text-yellow-500">BEER</span>TV
            </h1>
          </Link>

          <div className="mt-4 md:mt-0">
            <p className="text-gray-400 italic font-medium">
              The Ultimate Super Bowl Beer Commercial Experience
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
