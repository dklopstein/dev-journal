describe('Basic user path in homepage', () => {

  // Edit Journal
  it('Click into journal, type, click out', async () => {
    console.log('...');
    
  // First visit dev journal website with github pages
  await page.goto('https://cse110-sp24-group25.github.io/cse110-sp24-group25/source/homepage/homepage.html');

  // Visit dev journal using live server
  await page.goto('http://127.0.0.1:5500/source/homepage/homepage.html');

  console.log('Typing into journal');
        
  // Click into text area
  await page.click('#textarea');

  // Type into text area
  await page.type('#textarea', 'Example journal entry: I was so productive today!!');

  // Click out of the text area
  await page.click('#current-date');


    // Expect 
    expect().toBe();
  });
  
  // 
  it('', async () => {
    console.log('...');
    
    // Expect 
    expect().toBe();
  });
  
});