// E2E Testing with Puppeteer

/**
 * Testing for the main parts of the home page, journal and rating widget
 * 
 * JOURNAL AND RATING WIDGET TESTS
 */
describe('Usage of journal and rating widget', () => {
  // Open the webpage
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/source/homepage/homepage.html');
  });

  // Edit Journal
  it('Click into journal, type, click out', async () => {
    console.log('Editing journal...');

    // Wait for page to load
    await page.waitForSelector('#textarea');

    const journal = await page.$('#textarea');
    // Click into text area
    await journal.click();

    // Define string to type into journal
    const input_text = 'Example journal entry: I was so productive today!!';
    // Type into text area
    await page.keyboard.type(input_text);
    // Click out of the text area
    await page.click('#current-date');

    // Get journal text
    const text = await journal.getProperty('value');
    const journal_text = await text.jsonValue();

    // Expect journal text to be jour
    expect(journal_text).toBe(input_text);
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
    const img_happy = await page.$('#btn2 img');
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
    const pro5 = await page.$('#btn9');
    await pro5.click();

    // Get img element
    const img = await page.$('#btn9 img');
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
    const img_5 = await page.$('#btn9 img');

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

  // Ensure data is saved on reload
  it('Reload page and check repopulated', async () => {
    console.log('Reloading page...');

    // Reload page
    await page.reload();

    // Define string that is in journal
    const input_text = 'Example journal entry: I was so productive today!!';
    
    // Get journal text
    const journal = await page.$('#textarea');
    const text = await journal.getProperty('value');
    const journal_text = await text.jsonValue();

    // Expect journal text to be jour
    expect(journal_text).toBe(input_text);

    // Check rating widget
    // Get img elements
    const img_1 = await page.$('#btn6 img');
    const img_mad = await page.$('#btn1 img');
    
    // Get class name of 1 and mad imgs
    const class_name_1 = await page.evaluate(img_1 => {
      return img_1.getAttribute('class');
    }, img_1);
    const class_name_mad = await page.evaluate(img_mad => {
      return img_mad.getAttribute('class');
    }, img_mad);

    // Expect active to be on mad and 1 productivity
    expect(class_name_1).toBe("active");
    expect(class_name_mad).toBe("active");
  });
});



/**
 * Testing the task list resize, add task, recolor
 * 
 * TASK LIST TESTS
 */
describe('Homepage task list tests', () => {
  it('Add a task, set its title, and choose a color', async () => {
    console.log('Testing task addition, title setting, and color selection...');
  
    await page.setViewport({ width: 1200, height: 800 });

    await page.click('.add-task-btn');
  
    const taskInputSelector = '.task-container .task:last-child .task-input';
    await page.waitForSelector(taskInputSelector);
    const taskInput = await page.$(taskInputSelector);
  
    const taskTitle = 'New Task Title for Testing';
    await taskInput.type(taskTitle);
  
    const colorButton = '.task-container .task:last-child .color-buttons';
    const colorButtonSelector = '.task-container .task:last-child .color-button';
    await page.hover(colorButton);
    await page.click(colorButtonSelector);
  
    const enteredTitle = await page.evaluate(selector => {
      return document.querySelector(selector).textContent;
    }, taskInputSelector);
  
    const backgroundColor = await page.evaluate(selector => {
      const task = document.querySelector(selector);
      return window.getComputedStyle(task).backgroundColor;
    }, '.task-container .task:last-child');
  
    expect(enteredTitle).toBe(taskTitle);
    expect(backgroundColor).toBe('rgb(195, 128, 204)'); 

    await page.click('.task-container .task .fas.fa-trash-alt');
    const taskCountAfterDelete = await page.evaluate(() => {
      return document.querySelectorAll('.task-container .task').length;
    });

    expect(taskCountAfterDelete).toBe(0);
  });
  
  // Resize the window to make the task-list slide out
  it('Resize window and check task-list position', async () => {
    console.log('Testing window resize and task-list sliding...');

    // Resize the window to a smaller size
    await page.setViewport({ width: 700, height: 800 });

    // Check the class name for the task-list to see if it has moved
    const taskListClass = await page.evaluate(() => {
      return document.querySelector('.task-list').className;
    });

    expect(taskListClass.includes('active')).toBe(false);
  });

  // Click the task-list to bring it forward
  it('Click task-list to bring it forward', async () => {
    console.log('Testing task-list click to bring forward...');

    // Click on the task-list
    await page.evaluate(() => {
      document.querySelector('.task-list').click();
    });    
    // Check the task-list to see if it has active class
    const mainWrapClass = await page.evaluate(() => {
      return document.querySelector('.task-list').className;
    });

    // Expect the task-list to have 'active' class after clicking the task-list
    expect(mainWrapClass.includes('active')).toBe(true);
  });

  // Add a task using the "Add Task" button
  it('Add a task and check addition', async () => {
    console.log('Testing task addition...');

    const isActive = await page.evaluate(() => {
      return document.querySelector('.task-list').classList.contains('active');
    });
    if (!isActive) {
      await page.evaluate(() => {
        document.querySelector('.task-list').click();
      });
    }

    // Click the "Add Task" button
    await page.click('.add-task-btn');
    // Check the number of tasks in the task-container
    const taskCount = await page.evaluate(() => {
      return document.querySelectorAll('.task-container .task').length;
    });

    // Expect the task count to increase by 1 after clicking the add button
    expect(taskCount).toBe(1); // Modify the expected value based on initial number of tasks

    await page.click('.task-container .task .fas.fa-trash-alt');
    const taskCountAfterDelete = await page.evaluate(() => {
      return document.querySelectorAll('.task-container .task').length;
    });

    expect(taskCountAfterDelete).toBe(0);
  });

  // Click the main-wrap to hide the task-list
  it('Click main-wrap to hide task-list', async () => {
    console.log('Testing main-wrap click to hide task-list...');

    // Click on the main-wrap
    await page.click('.main-wrap');
    // Check the class name for the task-list to see if it has moved back
    const taskListClass = await page.evaluate(() => {
      return document.querySelector('.task-list').className;
    });
    
    // Expect the task-list to not have 'active' class after clicking the main-wrap
    expect(taskListClass.includes('active')).toBe(false);

    // Resize window back to original
    await page.setViewport({ width: 1200, height: 800 });
  });
});



/**
 * User marking a task as completed
 * 
 * COMPLETED TASK TESTS
 */
describe('Completing tasks', () => {

});


/**
* Testing all functionality contained within the Top-Bar on Homepage
* 
* TOP BAR TESTS
*/
describe('Homepage Top-Bar tests', () => {

  // Open the webpage
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/source/homepage/homepage.html');
  });

  /**
   * Test going to yesterday with previous date button
   */
  it('Click the previous date button 1 time', async () => {
    console.log('Testing going back multiple days');

    // Click prev date button 5 times
    const prevDateBtn = await page.$('.prev-date-btn');
    await prevDateBtn.click();

    // set the expected date
    let expectedDate = new Date();
    expectedDate.setDate(expectedDate.getDate() - 1);

    // get displayed date at the top
    const displayedDateText = await page.$eval(".date-header-text", (el) => {
      return el.textContent;
    });

    // get prevDate as a formatted string
    let expectedDateText = expectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    expect(displayedDateText).toBe(expectedDateText);
  });

  /**
   * Test the forward date from past day with next date button
   */
  it('Click the next date button 1 time', async () => {
    console.log('Testing going forward once from yesterday');

    // Click prev date button 5 times
    const nextDateBtn = await page.$('.next-date-btn');
    await nextDateBtn.click();
    
    // set the expected date: today
    let expectedDate = new Date();
    // get displayed date at the top
    const displayedDateText = await page.$eval(".date-header-text", (el) => {
      return el.textContent;
    });

    // get prevDate as a formatted string
    let expectedDateText = expectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    expect(displayedDateText).toBe(expectedDateText);
  });
  
  /**
   * Test going into the past 5 days
   */
  it('Click the previous date button 5 times', async () => {
    console.log('Testing going back multiple days');

    // Click prev date button 5 times
    const prevDateBtn = await page.$('.prev-date-btn');
    for (let i = 0; i < 5; i++) { await prevDateBtn.click(); }

    // set the expected date
    let expectedDate = new Date();
    expectedDate.setDate(expectedDate.getDate() - 5);
    // get displayed date at the top
    const displayedDateText = await page.$eval(".date-header-text", (el) => {
      return el.textContent;
    });

    // get prevDate as a formatted string
    let expectedDateText = expectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    expect(displayedDateText).toBe(expectedDateText);
  });

  /**
   * Test going forward 5 days from 5 days in the past
   */
  it('Click the next date button 5 times', async () => {
    console.log('Testing going from past days into multiple future days');

    // Click prev date button 5 times
    const nextDateBtn = await page.$('.next-date-btn');
    for (let i = 0; i < 5; i++) { await nextDateBtn.click(); }

    // set the expected date
    let expectedDate = new Date();
    // get displayed date at the top
    const displayedDateText = await page.$eval(".date-header-text", (el) => {
      return el.textContent;
    });

    // get prevDate as a formatted string
    let expectedDateText = expectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    expect(displayedDateText).toBe(expectedDateText);
  });

  /**
   * Test the inability to go into future days
   */
  it('Click next date button 3 times', async () => {
    console.log('Testing inability to go into future days');

    // Click prev date button 5 times
    const nextDateBtn = await page.$('.next-date-btn');
    await nextDateBtn.click();
    await nextDateBtn.click();
    await nextDateBtn.click();

    // set the expected date
    let expectedDate = new Date();
    // get displayed date at the top
    const displayedDateText = await page.$eval(".date-header-text", (el) => {
      return el.textContent;
    });

    // get prevDate as a formatted string
    let expectedDateText = expectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    expect(displayedDateText).toBe(expectedDateText);
  });
});