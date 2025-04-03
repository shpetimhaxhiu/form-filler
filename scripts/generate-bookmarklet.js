/**
 * Generate Bookmarklet
 * 
 * This script reads the minified JavaScript file and generates a bookmarklet
 * by prepending "javascript:" and updating the index.html file with both
 * the full and minified versions.
 * 
 * Created by Shpetim Haxhiu (https://pito.dev)
 */

const fs = require('fs');
const path = require('path');

// File paths
const minifiedFilePath = path.join(__dirname, '../dist/bookmarklet.min.js');
const originalFilePath = path.join(__dirname, '../bookmarklet.js');
const indexFilePath = path.join(__dirname, '../index.html');
const outputFilePath = path.join(__dirname, '../dist/bookmarklet-link.js');

// Generate the bookmarklet
function generateBookmarklet() {
  try {
    // Read the minified JavaScript
    let minifiedCode = fs.readFileSync(minifiedFilePath, 'utf8');
    const originalCode = fs.readFileSync(originalFilePath, 'utf8');
    
    // Clean up the minified code
    minifiedCode = minifiedCode
      .replace(/\r?\n/g, '') // Remove newlines
      .trim(); // Remove whitespace
    
    // Create bookmarklet by prepending "javascript:"
    const bookmarklet = `javascript:${minifiedCode}`;
    
    // Write the bookmarklet to a file
    fs.writeFileSync(outputFilePath, bookmarklet);
    
    console.log('✅ Bookmarklet generated successfully!');
    console.log(`📦 Saved to: ${outputFilePath}`);
    
    // Calculate size reduction
    const originalSize = Buffer.from(originalCode).length;
    const minifiedSize = Buffer.from(minifiedCode).length;
    const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);
    
    console.log(`📊 Size reduction: ${reduction}% (${originalSize} bytes → ${minifiedSize} bytes)`);
    
    return bookmarklet;
  } catch (error) {
    console.error('❌ Error generating bookmarklet:', error);
    process.exit(1);
  }
}

// Main execution
generateBookmarklet(); 