import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Function to get all ads from the JSON file
function getAds() {
  const filePath = path.join(process.cwd(), "data", "Beer-Tv-Ads.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(fileContents);
  return data;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const ads = getAds();
    const ad = ads.find((ad: any) => ad.id === params.id);

    if (!ad) {
      return NextResponse.json({ error: "Ad not found" }, { status: 404 });
    }

    return NextResponse.json(ad);
  } catch (error) {
    console.error("Error fetching ad details:", error);
    return NextResponse.json(
      { error: "Failed to fetch ad details" },
      { status: 500 },
    );
  }
}
