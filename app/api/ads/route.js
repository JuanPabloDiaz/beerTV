import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Function to get all ads from the JSON file
function getAds() {
  const filePath = path.join(process.cwd(), "data", "Beer-Tv-Ads.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(fileContents);
  return data;
}

export async function GET(request) {
  try {
    const ads = getAds();
    const { searchParams } = new URL(request.url);

    // Filter by brand if provided
    const brand = searchParams.get("brand");
    const language = searchParams.get("spot_language");
    const parentBrand = searchParams.get("brand_parent_name");

    let filteredAds = ads;

    if (brand) {
      filteredAds = filteredAds.filter((ad) =>
        ad.brand_name.toLowerCase().includes(brand.toLowerCase()),
      );
    }

    if (language) {
      filteredAds = filteredAds.filter(
        (ad) => ad.spot_language.toLowerCase() === language.toLowerCase(),
      );
    }

    if (parentBrand) {
      filteredAds = filteredAds.filter((ad) =>
        ad.brand_parent_name.toLowerCase().includes(parentBrand.toLowerCase()),
      );
    }

    return NextResponse.json(filteredAds);
  } catch (error) {
    console.error("Error fetching ads:", error);
    return NextResponse.json({ error: "Failed to fetch ads" }, { status: 500 });
  }
}
