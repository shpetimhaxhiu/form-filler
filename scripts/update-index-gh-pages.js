/**
 * Update Index HTML for GitHub Pages
 * 
 * This script updates the index.html file with the generated bookmarklets
 * for GitHub Pages deployment.
 * 
 * Created by Shpetim Haxhiu (https://pito.dev)
 */

const fs = require('fs');
const path = require('path');

// File paths
const distIndexFilePath = path.join(__dirname, '../dist/index.html');
const bookmarkletFilePath = path.join(__dirname, '../dist/bookmarklet-link.js');

function updateIndexHtml() {
  try {
    if (!fs.existsSync(distIndexFilePath)) {
      console.error('❌ Error: dist/index.html file not found. Make sure webpack has run.');
      process.exit(1);
    }

    if (!fs.existsSync(bookmarkletFilePath)) {
      console.error('❌ Error: dist/bookmarklet-link.js file not found. Make sure generate-bookmarklet.js has run.');
      process.exit(1);
    }

    // Read the index.html file and the bookmarklet file
    let indexHtml = fs.readFileSync(distIndexFilePath, 'utf8');
    const bookmarklet = fs.readFileSync(bookmarkletFilePath, 'utf8');

    // Update the bookmarklet links
    indexHtml = indexHtml.replace(
      /href="javascript:void\(0\);"\s+class="bookmarklet"\s+id="bookmarklet-minified"/g,
      `href="${bookmarklet}" class="bookmarklet" id="bookmarklet-minified"`
    );

    // Replace paths with GitHub Pages paths if needed
    if (process.env.GITHUB_PAGES === 'true') {
      indexHtml = indexHtml.replace(
        /src="(bookmarklet\.min\.js|bookmarklet\.js)"/g, 
        'src="/form-filler/$1"'
      );
      indexHtml = indexHtml.replace(
        /fetch\("(bookmarklet\.js|dist\/bookmarklet\.min\.js)"\)/g,
        'fetch("/form-filler/$1")'
      );
    }

    // Write the updated index.html file
    fs.writeFileSync(distIndexFilePath, indexHtml);
    
    console.log('✅ index.html updated with bookmarklet links for GitHub Pages!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Main execution
updateIndexHtml(); 