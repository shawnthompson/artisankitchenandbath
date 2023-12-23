// _data/createImageJSON.js
const fs = require('fs');
const path = require('path');

function getImagesFromDir(dir) {
  const images = [];

  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isFile() && (file.endsWith('.jpg') || file.endsWith('.png'))) {
      const imageName = file.replace(/\.(jpg|png)$/, ''); // Remove .jpg or .png extension from the file name
      images.push({
        name: imageName,
        path: `{{ baseUrl }}/img/galleries/${path.basename(dir)}/${file}`, // Constructing path without the directory prefix
        alt: '' // Adding a blank alt attribute
      });
    }
  });

  return images;
}

function processDirectories(parentDir) {
  const images = {};

  const files = fs.readdirSync(parentDir);
  files.forEach(file => {
    const filePath = path.join(parentDir, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      images[file] = getImagesFromDir(filePath);
    }
  });

  return images;
}

module.exports = function () {
  try {
    const imagesDir = './src/_raw-images/galleries'; // Updated path to your main images directory
    const imageInfo = processDirectories(imagesDir);

    const jsonOutputPath = './src/_data/images.json'; // Updated path for the JSON file

    const jsonContent = JSON.stringify(imageInfo, null, 2);

    // Write JSON to a file
    fs.writeFileSync(jsonOutputPath, jsonContent);

    console.log(`Images JSON file created successfully at: ${path.resolve(jsonOutputPath)}`);
    return 'Images JSON file created successfully!';
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
    throw error; // Rethrow the error to indicate the issue
  }
};
