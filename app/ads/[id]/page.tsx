import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import AdDetailClient from './ad-detail-client';

// Function to get all ads from the JSON file
function getAds() {
  const filePath = path.join(process.cwd(), 'data', 'Beer-Tv-Ads.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// This function is called during build to generate static pages for each ad
export async function generateStaticParams() {
  try {
    const ads = getAds();
    // Ensure we're returning valid id objects with string values
    return ads.map((ad) => {
      if (!ad || !ad.id || typeof ad.id !== 'string') {
        console.warn('Invalid ad id found:', ad?.id);
        return { id: 'invalid-id' }; // Fallback value
      }
      return { id: ad.id };
    });
  } catch (error) {
    console.error('Error generating static params:', error);
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
  const ad = ads.find(ad => ad.id === params.id);
  
  if (!ad) {
    notFound();
  }
  
  const relatedAds = ads
    .filter(relatedAd => relatedAd.brand_name === ad.brand_name && relatedAd.id !== ad.id)
    .slice(0, 3);
  
  return <AdDetailClient ad={ad} relatedAds={relatedAds} />;
}
