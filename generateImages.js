// generateImages.js
const createImageJSON = require('./createImageJSON');

const result = createImageJSON(); // Generate the JSON file

if (result.startsWith('Error')) {
  console.error(result); // Log error message
} else {
  console.log(result); // Log success message
}