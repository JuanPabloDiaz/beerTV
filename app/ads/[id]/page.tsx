import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import AdDetailClient from "./ad-detail-client";

// Function to get all ads from the JSON file
function getAds() {
  const filePath = path.join(process.cwd(), "data", "Beer-Tv-Ads.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(fileContents);
  
  // Add IDs and years to each ad (same logic as API)
  return data.map((ad, index) => {
    // Create a unique ID based on video URL and brand name to ensure uniqueness
    const videoId = ad.video_link.split('/').pop()?.split('.')[0] || `video-${index}`;
    const brandSlug = ad.brand_name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const uniqueId = `${brandSlug}-${videoId}-${index}`;
    
    return {
      ...ad,
      id: uniqueId,
      year: extractYearFromVideo(ad.video_link) || "2023",
      featured: index < 5
    };
  });
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
  const hash = videoUrl.split('/').pop()?.split('.')[0] || '';
  const hashNum = hash.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const yearOffset = hashNum % 10; // 0-9
  return String(2014 + yearOffset); // Years 2014-2023
}

// This function is called during build to generate static pages for each ad
export async function generateStaticParams() {
  try {
    const ads = getAds();
    // Ensure we're returning valid id objects with string values
    return ads.map((ad) => {
      if (!ad || !ad.id || typeof ad.id !== "string") {
        console.warn("Invalid ad id found:", ad?.id);
        return { id: "invalid-id" }; // Fallback value
      }
      return { id: ad.id };
    });
  } catch (error) {
    console.error("Error generating static params:", error);
    return []; // Return empty array if there's an error
  }
}

// Next.js 15 dynamic route page component - using JS without explicit types
export default async function Page({ params }) {
  // Check for id parameter
  if (!params?.id) {
    notFound();
  }

  const ads = getAds();
  const ad = ads.find((ad) => ad.id === params.id);

  if (!ad) {
    notFound();
  }

  const relatedAds = ads
    .filter(
      (relatedAd) =>
        relatedAd.brand_name === ad.brand_name && relatedAd.id !== ad.id,
    )
    .slice(0, 3);

  return <AdDetailClient ad={ad} relatedAds={relatedAds} />;
}
