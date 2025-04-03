/**
 * Update Index HTML
 * 
 * This script updates the index.html file with the generated bookmarklets
 * for both full and minified versions.
 * 
 * Created by Shpetim Haxhiu (https://pito.dev)
 */

const fs = require('fs');
const path = require('path');

// File paths
const indexFilePath = path.join(__dirname, '../index.html');
const originalFilePath = path.join(__dirname, '../bookmarklet.js');
const minifiedFilePath = path.join(__dirname, '../dist/bookmarklet-link.js');

// We don't need to update the index.html anymore as we're using client-side JavaScript
// to load the bookmarklets.
function updateIndexHtml() {
  try {
    console.log('✅ Using client-side script to load bookmarklets in index.html');
    console.log('✅ No server-side update needed!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Main execution
updateIndexHtml(); 