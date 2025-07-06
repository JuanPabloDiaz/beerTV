import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Function to get all ads from the JSON file
function getAds() {
  const filePath = path.join(process.cwd(), "data", "Beer-Tv-Ads.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(fileContents);

  // Add IDs and years to each ad
  return data.map((ad, index) => ({
    ...ad,
    id: `ad-${index + 1}`,
    year: extractYearFromVideo(ad.video_link) || "2023", // Default year if can't extract
    featured: index < 5, // Mark first 5 as featured for demo
  }));
}

// Helper function to extract year from video URL or use default
function extractYearFromVideo(videoUrl) {
  // Try to extract year from URL patterns if available
  const yearMatch = videoUrl.match(/\/(20\d{2})\//);
  if (yearMatch) {
    return yearMatch[1];
  }

  // Try another pattern
  const yearMatch2 = videoUrl.match(/_(20\d{2})_/);
  if (yearMatch2) {
    return yearMatch2[1];
  }

  // For cloudfront URLs, we'll use a range of years for variety
  const hash = videoUrl.split("/").pop()?.split(".")[0] || "";
  const hashNum = hash
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const yearOffset = hashNum % 10; // 0-9
  return String(2014 + yearOffset); // Years 2014-2023
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
