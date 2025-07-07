/**
 * Script to analyze and detect similar beer TV ads
 * Run with: node scripts/analyze-duplicates.js
 */

const fs = require('fs')
const path = require('path')

const dataPath = path.join(__dirname, '..', 'data', 'beer-tv-ads.json')
const ads = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

function analyzeAds() {
  console.log('🍺 Beer TV Ads Analysis Report')
  console.log('================================\n')

  // Group by brand
  const brandGroups = {}
  ads.forEach(ad => {
    if (!brandGroups[ad.brand_name]) {
      brandGroups[ad.brand_name] = []
    }
    brandGroups[ad.brand_name].push(ad)
  })

  // Find brands with multiple ads
  const multipleAds = Object.entries(brandGroups)
    .filter(([brand, ads]) => ads.length > 1)
    .sort((a, b) => b[1].length - a[1].length)

  console.log('Brands with multiple ads:')
  console.log('-------------------------')
  multipleAds.forEach(([brand, ads]) => {
    console.log(`${brand}: ${ads.length} ads`)
    
    // Check for similar descriptions (potential similar content)
    const descriptions = ads.map(ad => ad.spot_description?.toLowerCase() || '')
    const commonWords = ['rich', 'champagne', 'beer', 'high life']
    
    const similarAds = ads.filter(ad => {
      const desc = ad.spot_description?.toLowerCase() || ''
      return commonWords.some(word => desc.includes(word))
    })

    if (similarAds.length > 1) {
      console.log(`  ⚠️  ${similarAds.length} ads with similar themes:`)
      similarAds.forEach(ad => {
        console.log(`    - ID ${ad.id}: "${ad.spot_description?.substring(0, 60)}..."`)
      })
    }
    
    console.log('')
  })

  // Miller High Life specific analysis
  const millerAds = brandGroups['Miller High Life'] || []
  console.log('Miller High Life Analysis:')
  console.log('-------------------------')
  console.log(`Total Miller High Life ads: ${millerAds.length}`)
  
  millerAds.forEach(ad => {
    console.log(`ID ${ad.id}: ${ad.spot_description?.substring(0, 100)}...`)
    console.log(`  Video: ${ad.video_link.split('/').pop()}`)
    console.log('')
  })

  // Recommend actions
  console.log('Recommendations:')
  console.log('----------------')
  console.log('1. ✅ UI improvements added (duration badges, video filenames, IDs)')
  console.log('2. ✅ Warning system for similar content implemented')
  console.log('3. 📋 Consider adding poster images to differentiate videos')
  console.log('4. 🎯 Users should skip to 0:20s for unique Miller High Life content')
}

analyzeAds()
