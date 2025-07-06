# 🍺 Beer TV - Super Bowl Commercial Experience

A full-stack Next.js application that showcases iconic beer commercials with a Super Bowl aesthetic. This application allows users to browse and watch beer commercials from various brands.

## 🧠 Features

- **Bold, cinematic UI** styled like a Super Bowl beer ad experience
- **Featured commercial** highlighted at the top of the homepage
- **Filter by brand** to find commercials from your favorite beer brands
- **Responsive design** works on mobile, tablet, and desktop
- **Video-first layout** optimized for watching beer commercials
- **API endpoints** for accessing beer commercial data

## 🧱 Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Database**: Local JSON file (data/Beer-Tv-Ads.json)
- **Backend**: Next.js API Routes

## 📋 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/beertv.git
   cd beertv
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
/beertv
  /app                   # Next.js App Router
    /api                 # API Routes
      /ads               # Beer ad API endpoints
    /ads                 # Ad detail pages
    page.tsx             # Homepage
  /components            # Reusable React components
    AdCard.tsx           # Beer commercial card
    BrandFilter.tsx      # Brand filter component
    Footer.tsx           # Application footer
    Header.tsx           # Application header
    VideoPlayer.tsx      # Video player component
  /data                  # Data source
    Beer-Tv-Ads.json     # Local JSON database for beer ads
  /public                # Static assets
```

## 🛠️ API Endpoints

- `GET /api/ads`: Returns all beer commercials
- `GET /api/ads?brand=Budweiser`: Filter commercials by brand name
- `GET /api/ads?spot_language=en`: Filter commercials by language
- `GET /api/ads?brand_parent_name=Anheuser-Busch`: Filter commercials by parent brand
- `GET /api/ads/[id]`: Get details for a specific commercial by ID

## 🎨 Design Approach

The UI is designed to evoke the bold, cinematic feel of Super Bowl beer commercials with:

- Dark theme with gold accents
- Bold typography using Bebas Neue font
- Cinematic video layouts
- Responsive grid design for all device sizes
- Smooth animations and transitions

## 📝 License

This project is MIT licensed.
