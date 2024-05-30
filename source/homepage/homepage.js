window.addEventListener('DOMContentLoaded', init);

// Counter for iding tasks
let task_counter = 1;

// Get current date globals
var currDate = new Date();

/**
 * Initializes current date heading
 * 
 * @returns {undefined} Nothing
 */
function init() {
    // Display the current date
    displayDate(formatDate(currDate));
    displayWeek();
    initButtons();
}

/**
 * Initializes functionality of buttons
 */
function initButtons() {
    const nextBtn = document.querySelector(".next-date-btn");
    nextBtn.addEventListener("click", nextDate);
    const prevBtn = document.querySelector(".prev-date-btn");
    prevBtn.addEventListener("click", prevDate);
    const addTaskBtn = document.querySelector(".add-task-btn");
    addTaskBtn.addEventListener("click", addTask);
    const ratingSelBtn = document.querySelectorAll(".rating-select-btn");
    ratingSelBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            var id = btn.getAttribute("id");
            selectWidget(id);
        });
    });
}

/**
 * Updates interface with date
 * 
 * @param {string} date - date in string format
 */
function displayDate(date) {
    // Display the date in the designated container
    const dateContainer = document.getElementById('current-date');
    dateContainer.textContent = date;
}

/**
 * Updates the global currDate to the next date and updates interface
 */
function nextDate() {
    currDate.setDate(currDate.getDate() + 1);
    displayDate(formatDate(currDate));
}

/**
 * Updates global currDate to the previous date and updates interface
 */
function prevDate() {
    currDate.setDate(currDate.getDate() - 1);
    displayDate(formatDate(currDate));
}
/**
 * Formats the currDate global variable into proper string display
 * @returns {string} - properly formatted string representing the date as "Weekday, Month Day, Year"
 */
function formatDate() {
    // Format the date (e.g., "May 8, 2024")
    const formattedDate = currDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return formattedDate;
}

/**
 * Shows that a given button has been selected by adding the active property to its classname
 * 
 * @param {int} buttonIndex - the index of the button selected.
 * 1-5 for mental health, 6-10 for productivity
 */
function selectWidget(buttonIndex) {
    // Clear active class from all buttons in row and
    // Add active class to selected button
    if (buttonIndex > 5) {
        const buttons = document.querySelectorAll('.productiveness img');
        buttons.forEach(button => {
            button.classList.remove('active');
        });
        const selection = document.querySelector(`.rating-widget .productiveness button:nth-child(${buttonIndex - 5}) img`);
        selection.classList.add('active');
    }
    else {
        const buttons = document.querySelectorAll('.feelings img');
        buttons.forEach(button => {
            button.classList.remove('active');
        });
        const selection = document.querySelector(`.rating-widget .feelings button:nth-child(${buttonIndex}) img`);
        selection.classList.add('active');
    }
}

// Add event listener to remove active and blur task when you click outside of task
document.addEventListener('click', function(event) {
    const currTask = document.querySelector('#taskContainer .active');

    if (currTask && !currTask.contains(event.target)) {
        currTask.classList.remove('active');
        const textarea = currTask.querySelector('.task-name');
        textarea.blur();
        autoResize(textarea)
    }
});

/**
 * A function to create a new task and place it in the sidebar
 */
function addTask() {
    // Create the new list item element
    const li = document.createElement('li');

    // Create a div to hold checkbox and input
    const input_wrap = document.createElement('div');
    input_wrap.className = 'input-wrap';

    // Create the checkbox input to input_wrap
    const checkbox = document.createElement('button');
    checkbox.className = 'task-checkbox';
    checkbox.id = 'task' + task_counter;
    task_counter++;

    // Create img element for checkbox
    const check = document.createElement('img');
    check.src = '../icons/check-icon.svg';
    check.alt = 'Check';
    // Append img to checkbox
    // checkbox.appendChild(check);

    // Append checkbox to input wrap
    input_wrap.appendChild(checkbox);

    // Event listener to move task to completed when it is selected
    checkbox.addEventListener('click', function() {
        // Add or remove completed from class name
        // Find closest li item (task)
        const task = checkbox.closest('li');

        if (task.className.includes('complete')) {
            task.classList.remove('complete');
            const taskContainer = document.getElementById('taskContainer');
            taskContainer.appendChild(task);
        }
        else {
            task.classList.add('complete');
            const completedTaskContainer = document.getElementById('completedTaskContainer');
            completedTaskContainer.appendChild(task);
        }
    });

    // Create and append the input element with the task name
    const task_name = document.createElement('textarea');
    task_name.placeholder = 'Input Task Name...';
    task_name.className = 'task-name';
    task_name.maxLength = 100;
    input_wrap.appendChild(task_name);

    // Append input-wrap to li
    li.appendChild(input_wrap);

    // Add event listener to add active to class name when editing
    task_name.addEventListener('focus', function() {
        li.classList.add('active');
    });

    // Add event listener to stop editing when user presses enter
    task_name.addEventListener('keydown', function(event) {
        if (event.key == 'Enter') {
            if (!event.shiftKey) {
                // Shift+Enter pressed, insert a line break
                // Enter pressed, end editing
                event.preventDefault(); // Prevent default behavior of Enter key
                task_name.blur(); // Remove focus from the element
                li.classList.remove('active');
                const textarea = li.querySelector('.task-name');
                autoResize(textarea);
            }
        }
    });

    // Create and append the color-buttons div
    const colorButtons = document.createElement('div');
    colorButtons.className = 'color-buttons';
    li.appendChild(colorButtons);

    // List of colors
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', '#e0e0e0'];

    // Create and append each color button
    colors.forEach(color => {
        const button = document.createElement('button');
        button.className = 'color-button ' + color;
        button.style.background = color;
        button.addEventListener('click', function() {
            li.style.background = color;
            if ( color == 'blue' || color == 'green' || color == 'red') {
                task_name.style.color = '#e0e0e0';
            }
            else {
                task_name.style.color = 'black';
            }
        });
        colorButtons.appendChild(button);
    });

    // Create and append the trash icon
    const trashIcon = document.createElement('img');
    trashIcon.src = '../icons/trash-icon.svg';
    trashIcon.alt = 'Remove';
    trashIcon.className = 'fas fa-trash-alt';

    trashIcon.addEventListener('click', function() {
        // Find the parent <li> element of the clicked trash icon
        const task = trashIcon.closest('li');
            
        // Remove the <li> element from the DOM
        if (task) {
            task.remove();
        }
    });

    li.appendChild(trashIcon);

    // Append the new list item to the task list
    const taskContainer = document.getElementById('taskContainer');
    taskContainer.appendChild(li);
    
    // Auto click into the task name text box
    setTimeout(() => {
        task_name.focus();
        document.getSelection().collapseToEnd();
    }, 0);
}

/**
 * Resizes the textarea holding the task name for an element
 * 
 * @param {textarea} textarea to resize in task
 */
function autoResize(textarea) {
    textarea.style.height = 'auto'; // Reset the height
    textarea.style.height = textarea.scrollHeight + 'px'; // Set the height to the scroll height
    if (textarea.value == '' || textarea.value.length < 15) {
        textarea.style.height = '24px';
    }
    alert(textarea.value.clientHeight);
}

/**
 * Updates interface with Past Week view
 */
function displayWeek() {

    // initialize days of the week
    let allDays = ["Sun", "Mon", "Tue", "Wed","Thu", "Fri", "Sat"];

    // Get and clear the table
    let table = document.getElementById("week-calendar");
    table.innerHTML = "";

    // Copy the global date into local variable
    let currWeekDay = new Date();
    currWeekDay.setDate(currWeekDay.getDate() + 1);

    // BUILD CALENDAR
    // Create row
    let row = document.createElement("tr");

    // Loop through number of columns
    for (let i = 0; i < 7; i++) {
        // Create data for each table cell in the row
        let cellData = document.createElement("td");

        // Calculate dates
        if (i === 0){
            currWeekDay.setDate(currWeekDay.getDate() + (i-8));
        }
        else {
            currWeekDay.setDate(currWeekDay.getDate() + 1);
        }

        // current cell Date
        let cellNum = document.createElement('span'); 
        cellNum.textContent = allDays[currWeekDay.getDay()] + " " + (currWeekDay.getMonth()+1) + "/" + currWeekDay.getDate();
        cellNum.className = "cell-date";
        
        // Append cell number to new cell
        cellData.appendChild(cellNum);

        // Add sentiment icon
        let sentimentIcon = document.createElement("img");
        sentimentIcon.src = "../icons/5overjoyed.png"; 
        sentimentIcon.alt = "sentiment icon";
        sentimentIcon.className = "sentiment-icon";
        // Append sentiment icon to new cell
        cellData.appendChild(sentimentIcon);

        // Add productivity icon
        let productivityIcon = document.createElement("img");
        productivityIcon.src = "../icons/5overjoyed.png"; 
        productivityIcon.alt = "productivity icon";
        productivityIcon.className = "productivity-icon";
        // Append sentiment icon to new cell
        cellData.appendChild(productivityIcon);

        // Add tasklist in calendar cell
        // Create tasklist div
        let taskDiv = document.createElement("div");
        taskDiv.className = "task-div";
        // Create unordered list
        let taskList = document.createElement("ul");
        taskList.className = "task-ul";
        // first task
        let task1 = document.createElement("li");
        task1.textContent = "I am the first task";
        task1.className = "task-item";
        taskList.appendChild(task1);
        // second task
        let task2 = document.createElement("li");
        task2.textContent = "I am the second task";
        task2.className = "task-item";
        taskList.appendChild(task2);
        // third task
        let task3 = document.createElement("li");
        task3.textContent = "I am the third task";
        task3.className = "task-item";
        taskList.appendChild(task3);
        // Append taskList to task div;
        taskDiv.appendChild(taskList);
        // Append tasklist div to new cell
        cellData.appendChild(taskDiv);

        // Append new cell to row
        row.appendChild(cellData);
    }
    // Append row to table
    table.appendChild(row);
}