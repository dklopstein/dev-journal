describe('Basic user path in homepage', () => {
  // Visit dev journal using live server
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/source/homepage/homepage.html');
  });

  // Edit Journal
  it('Click into journal, type, click out', async () => {
    console.log('...');

  // Visit dev journal using live server

  console.log('Typing into journal');
        
  // Click into text area
  await page.click('#textarea');

  // Type into text area
  await page.type('#textarea', 'Example journal entry: I was so productive today!!');

  // Click out of the text area
  await page.click('#current-date');


    // Expect 
    expect(4).toBe(2);
  });
  
  // 
  it('', async () => {
    console.log('...');
    
    // Expect 
    expect().toBe();
  });
  
});