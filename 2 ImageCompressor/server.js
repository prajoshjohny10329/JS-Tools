const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

// Specify the directories
const inputDirectory =  path.join(__dirname, 'input'); // Replace with the path to your input folder
const outputDirectory =  path.join(__dirname, 'output'); // Replace with the path to your output folder

// Create the output directory if it doesn't exist
fs.ensureDirSync(outputDirectory);

// Function to compress images
fs.readdir(inputDirectory, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach(file => {
        const inputFilePath = path.join(inputDirectory, file);
        const outputFilePath = path.join(outputDirectory, file);

        // Check if the file is an image
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        if (imageExtensions.includes(path.extname(file).toLowerCase())) {
            sharp(inputFilePath)
                .resize({ width: 1500 }) // Resize the image to a width of 800px
                .toFormat('jpeg', { quality: 98 }) // Compress the image with 80% quality
                .toFile(outputFilePath, (err, info) => {
                    if (err) {
                        console.log(`Error compressing file ${file}:`, err);
                    } else {
                        console.log(`Compressed: ${file}`);
                    }
                });
        }
    });
});
