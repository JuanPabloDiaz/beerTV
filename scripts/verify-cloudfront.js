/**
 * Script to verify if CloudFront is serving the same video file for different URLs
 * This will download the first 256KB of each video and compare SHA1 hashes
 */

const https = require('https')
const crypto = require('crypto')

const millerUrls = [
  'https://d3npuic909260z.cloudfront.net/001/168/018/7_1U.mp4',
  'https://d3npuic909260z.cloudfront.net/001/168/002/7_1X.mp4',
  'https://d3npuic909260z.cloudfront.net/001/100/069/7GZK.mp4',
  'https://d3npuic909260z.cloudfront.net/001/334/110/ATIB.mp4',
  'https://d3npuic909260z.cloudfront.net/001/334/115/ATIp.mp4'
]

console.log('🔍 Testing if CloudFront serves the same video for different URLs...')
console.log('📥 Downloading first 256KB of each video for comparison...\n')

let completed = 0
const results = []

millerUrls.forEach((url, index) => {
  const hash = crypto.createHash('sha1')
  
  const req = https.get(url, {
    headers: {
      'Range': 'bytes=0-262143' // First 256KB
    }
  }, (res) => {
    console.log(`📺 Video ${index + 1} (${url.split('/').pop()}):`)
    console.log(`   Status: ${res.statusCode}`)
    console.log(`   Content-Length: ${res.headers['content-length']}`)
    
    res.on('data', (chunk) => {
      hash.update(chunk)
    })
    
    res.on('end', () => {
      const sha1 = hash.digest('hex')
      results.push({
        url,
        filename: url.split('/').pop(),
        sha1: sha1.substring(0, 16) + '...' // Show first 16 chars
      })
      
      console.log(`   SHA1: ${sha1}`)
      console.log('')
      
      completed++
      
      if (completed === millerUrls.length) {
        console.log('📊 ANALYSIS RESULTS:')
        console.log('===================')
        
        // Group by SHA1 hash
        const hashGroups = {}
        results.forEach(result => {
          if (!hashGroups[result.sha1]) {
            hashGroups[result.sha1] = []
          }
          hashGroups[result.sha1].push(result.filename)
        })
        
        const uniqueHashes = Object.keys(hashGroups)
        console.log(`🔢 Total unique video files: ${uniqueHashes.length}`)
        console.log(`🔢 Total URLs tested: ${millerUrls.length}`)
        
        if (uniqueHashes.length === millerUrls.length) {
          console.log('✅ CONFIRMED: All videos are unique files')
        } else {
          console.log('❌ PROBLEM FOUND: Some URLs serve the same video file:')
          Object.entries(hashGroups).forEach(([hash, files]) => {
            if (files.length > 1) {
              console.log(`   Hash ${hash}: ${files.join(', ')}`)
            }
          })
        }
      }
    })
  })
  
  req.on('error', (err) => {
    console.error(`❌ Error downloading ${url}:`, err.message)
    completed++
  })
})
