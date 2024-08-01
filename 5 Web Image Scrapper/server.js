const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
// const { log } = require('console');

const url  = 'https://chiramelauditorium.in/'

 fetchImage = async ()=>{
    try {
        // Fetch HTML content from the URL
        const { data: html } = await axios.get(url);
        const $ = cheerio.load(html);
        
        // Extract image URLs
        const imageUrls = [];
        $('img').each((index, element) => {
          const src = $(element).attr('src');
          if (src) {
            const absoluteUrl = new URL(src, url).href;
            imageUrls.push(absoluteUrl);
          }
        });
    
        // Download images
        await Promise.all(imageUrls.map(async (imageUrl, index) => {
          const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
          const extension = path.extname(imageUrl) || '.jpg';
          const imagePath = path.join(__dirname, 'images', `image${index}${extension}`);
          fs.writeFileSync(imagePath, response.data);
        }));
        console.log('Images downloaded successfully');
      } catch (error) {
        console.error('Error downloading images:', error);
      }
}

fetchImage()