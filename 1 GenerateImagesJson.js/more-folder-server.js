const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, 'input');
const outputFilePath = path.join(__dirname, 'Output', 'images.json');

function getImagesRecursively(dir) {
  let results = [];
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const relativePath = path.relative(imageDir, fullPath);
    const pathParts = relativePath.split(path.sep);
    
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(getImagesRecursively(fullPath)); // Recursive call for subdirectories
    } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(item)) {
      results.push({
        path: `/assets/${relativePath.replace(/\\/g, '/')}`,
        alt: `Blend In Kos Architects ${relativePath.replace(/img/g, "").replace(/\\/g, ' ').replace(/\.[^.]+$/, '')}`,
        alt2: relativePath.replace(/img/g, "").replace(/\\/g, " ").replace(".jpg", ""), // Generate alt text from filename

        category: pathParts.length > 1 ? pathParts[1] : "Uncategorized",
        projectName: pathParts.length > 2 ? pathParts[2] : "Unknown"
      });
    }
  });
  
  return results;
}

const imageStructure = getImagesRecursively(imageDir);

fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
fs.writeFileSync(outputFilePath, JSON.stringify(imageStructure, null, 2));

console.log('images.json file has been generated successfully.');
