const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, 'Input');
const outputFilePath = path.join(__dirname, '/Output/images.json');

fs.readdir(imageDir, (err, files) => {
  if (err) {
    console.error('Unable to scan directory:', err);
    return;
  }

  const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
  const imagePaths = imageFiles.map(file => `assets/img/events/Onam/${file}`);

  fs.writeFile(outputFilePath, JSON.stringify(imagePaths, null, 2), (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
      return;
    }

    console.log('images.json file has been generated.');
  });
});
