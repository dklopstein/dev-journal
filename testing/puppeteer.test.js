// All of the commented out code in the beginning is there to display the browser when running tests locally
// E2E Testing with Puppeteer
describe('Basic user path in homepage', () => {
  // Open the webpage
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/source/homepage/homepage.html');
  });

  // Select happy in feelings widget
  it('Click happiest rating in feelings widget', async () => {
    console.log('Testing feelings widget first click...');
    // Click happiest rating button
    const happy = await page.$('#btn4');
    await happy.click();

    // Check class name to include active
    const class_name = await page.evaluate(() => {
      const img = document.querySelector('#btn4 img');
      return img.className;
    });
    // Expect active got added to happy class name
    expect(class_name).toBe("active");
  });
  // Select mad in feelings widget
  it('Click mad rating in feelings widget', async () => {
    console.log('Testing feelings widget second click...');
    // Click happiest rating button
    const mad = await page.$('#btn1');
    await mad.click();
    // Get img element for happy and mad
    const img_happy = await page.$('#btn5 img');
    const img_mad = await page.$('#btn1 img');
    // Store class name of both happy and mad
    const class_name_happy = await page.evaluate(img_happy => {
      return img_happy.getAttribute('class');
    }, img_happy);
    const class_name_mad = await page.evaluate(img_mad => {
      return img_mad.getAttribute('class');
    }, img_mad);
    // Expect active removed from happy and added to mad
    expect(class_name_mad).toBe("active");
    expect(class_name_happy).toBe('');
  });
  // Select 5 in productivity widget
  it('Click 5 rating in productivity widget', async () => {
    console.log('Testing productivity widget first click...');
    // Click 5 productivity rating button
    const pro5 = await page.$('#btn10');
    await pro5.click();
    // Get img element
    const img = await page.$('#btn10 img');
    // Get class name of 1 productivity
    const class_name = await page.evaluate(img => {
      return img.getAttribute('class');
    }, img);
    // Expect active to be added to class name of 5 img
    expect(class_name).toBe("active");
  });
  // Select 1 in productivity widget
  it('Click 1 rating in productivity widget', async () => {
    console.log('Testing productivity widget second click...');
    // Click 1 productivity rating button
    const pro1 = await page.$('#btn6');
    await pro1.click();
    // Get img elements
    const img_1 = await page.$('#btn6 img');
    const img_5 = await page.$('#btn10 img');
    // Get class name of 1 and 5 productivity imgs
    const class_name_1 = await page.evaluate(img_1 => {
      return img_1.getAttribute('class');
    }, img_1);
    const class_name_5 = await page.evaluate(img_5 => {
      return img_5.getAttribute('class');
    }, img_5);
    // Expect active to be on img1 and not img5
    expect(class_name_1).toBe("active");
    expect(class_name_5).toBe("");
  });
  // Template
  it('', async () => {
    // Expect
    expect().toBe();
  });
  // TODO: Add more tests
});