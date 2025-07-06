import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-yellow-600 mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-white">
              <span className="text-yellow-500">BEER</span>TV
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              The ultimate collection of iconic beer commercials.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} BeerTV. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">Drink Responsibly</p>
            <p className="text-gray-500 text-xs mt-1">
              <a
                href="http://jpdiaz.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                Juan Diaz
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
