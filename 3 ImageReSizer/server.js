const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Directory containing images
const inputDir = path.join(__dirname, 'input');
const outputDir = path.join(__dirname, 'output');

// Desired dimensions
const width = 1200;
const height = 867;

// Function to resize a single image
const resizeImage = async (inputPath, outputPath, width, height) => {
  try {
    await sharp(inputPath)
      .resize(width, height)
      .toFile(outputPath);
    console.log(`Resized: ${outputPath}`);
  } catch (error) {
    console.error(`Error resizing ${inputPath}:`, error.message);
  }
};

// Function to resize all images in a directory
const resizeAllImages = async (inputDir, outputDir, width, height) => {
  try {
    const files = fs.readdirSync(inputDir);
    for (const file of files) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file);

      // Check if the file is an image
      if (fs.statSync(inputPath).isFile() && /\.(jpe?g|png|gif|bmp)$/i.test(file)) {
        await resizeImage(inputPath, outputPath, width, height);
      }
    }
  } catch (error) {
    console.error('Error resizing images:', error.message);
  }
};

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Start resizing images
resizeAllImages(inputDir, outputDir, width, height);
