// Initialize puppeteer
import puppeteer from 'puppeteer';

// Launch browser
const browser = await puppeteer.launch({headless: false,slowMo:10});
const page = await browser.newPage();

('Basic user path', async () => {

  // First visit dev journal website with github pages
  // await page.goto('https://cse110-sp24-group25.github.io/cse110-sp24-group25/source/homepage/homepage.html');

  // Visit dev journal using live server
  await page.goto('http://127.0.0.1:5500/source/homepage/homepage.html');

  console.log('Typing into journal');
        
  // Click into text area
  await page.click('#textarea');

  // Type into text area
  await page.type('#textarea', 'Example journal entry: I was so productive today!!');

  // Click out of the text area
  await page.click('#current-date');

  // Click into journal, type, and click out
  (function () {
    console.log('Test');

  });

  // 
  (async () => {
    console.log('');

  });

  // Close out of the browser
  await browser.close();
  
})();