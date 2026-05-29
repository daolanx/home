const { execSync } = require('child_process');

function takeScreenshot(url, filename) {
  try {
    // Open Safari with the URL
    execSync(`open -a Safari "${url}"`);
    console.log(`Opened ${url} in Safari`);
    
    // Wait for page to load
    console.log('Waiting 3 seconds for page to load...');
    execSync('sleep 3');
    
    // Take screenshot using screencapture
    console.log(`Taking screenshot: ${filename}`);
    execSync(`screencapture -x screenshots/${filename}.png`);
    console.log(`Screenshot saved: screenshots/${filename}.png`);
  } catch (error) {
    console.error(`Error taking screenshot: ${error.message}`);
  }
}

// Take screenshots
takeScreenshot('http://localhost:3000/en', 'screenshot-en');
takeScreenshot('http://localhost:3000/zh', 'screenshot-zh');

console.log('\nDone! Check screenshots/ directory');
