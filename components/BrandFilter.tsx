import React from "react";

interface Brand {
  name: string;
  count: number;
}

interface BrandFilterProps {
  brands: Brand[];
  selectedBrand: string | null;
  onSelectBrand: (brand: string | null) => void;
}

const BrandFilter: React.FC<BrandFilterProps> = ({
  brands,
  selectedBrand,
  onSelectBrand,
}) => {
  return (
    <div className="flex flex-wrap gap-2 my-6">
      <button
        onClick={() => onSelectBrand(null)}
        className={`px-4 py-2 rounded-full font-bold text-sm transition-all
          ${
            !selectedBrand
              ? "bg-yellow-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
      >
        All Brands
      </button>

      {brands.map((brand) => (
        <button
          key={brand.name}
          onClick={() => onSelectBrand(brand.name)}
          className={`px-4 py-2 rounded-full font-bold text-sm transition-all
            ${
              selectedBrand === brand.name
                ? "bg-yellow-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
        >
          {brand.name} ({brand.count})
        </button>
      ))}
    </div>
  );
};

export default BrandFilter;
