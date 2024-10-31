const Tesseract = require('tesseract.js');

const imagePath = 'image/4.jpeg'
console.log(imagePath);


    Tesseract.recognize(imagePath, 'eng')
      .then(({ data: { text } }) => {
        console.log(text);
        
      })
      .catch(error => {
        console.log(error);
        
      });

