const fs = require('fs');
const path = require('path');

// === CONFIG ===
const inputDir = path.join(__dirname, 'input');
const outputDir = path.join(__dirname, 'output'); // Set same as inputDir if you want to overwrite

// === Ensure output directory exists ===
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// === Read all HTML files from input directory ===
fs.readdir(inputDir, (err, files) => {
  if (err) {
    return console.error('❌ Error reading input directory:', err);
  }

  const htmlFiles = files.filter(file => file.endsWith('.html'));

  if (htmlFiles.length === 0) {
    return console.log('No HTML files found in input folder.');
  }

  htmlFiles.forEach(file => {
    const inputFilePath = path.join(inputDir, file);
    const outputFilePath = path.join(outputDir, file);

    fs.readFile(inputFilePath, 'utf8', (err, data) => {
      if (err) {
        return console.error(`❌ Error reading ${file}:`, err);
      }

      const fixedContent = data.replace(/\\/g, '/');

      fs.writeFile(outputFilePath, fixedContent, (err) => {
        if (err) {
          return console.error(`❌ Error writing ${file}:`, err);
        }

        console.log(`✔️ Fixed: ${file}`);
      });
    });
  });
});
