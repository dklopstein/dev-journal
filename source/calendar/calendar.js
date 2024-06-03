const DISPLAY_TASK_COUNT = 2;
const RATING_FILES_NAMES = ["1angry.png", "2upset.png", "3neutral.png", "4happy.png", "5overjoyed.png"];
const PRODUCTIVITY_FILES_NAMES = ["1-icon.svg", "2-icon.svg", "3-icon.svg", "4-icon.svg", "5-icon.svg"];

// Wait for window to load
window.addEventListener('DOMContentLoaded', init);

// Get current date globals
var currDate = new Date();
var month = currDate.getMonth();
var year = currDate.getFullYear();

// Update the global date variables
function updateDateGlobals() {
    month = currDate.getMonth();
    year = currDate.getFullYear();
}

// When page loads
function init() {
    // Initiaze the jump buttons
    displayJump(year - 6, year + 5);

    // Initially display the calendar, calendar header, and task colors
    calendarHeader();
    displayCalendar();

    // Initialize the buttons 
    initButtons();

    loadTasks();
}


// FUNCTIONS

function initButtons() {

    const addTaskBtn = document.querySelector(".add-task-btn");
    addTaskBtn.addEventListener("click", addTask);

    // PREVIOUS MONTH BUTTON
    let prevBtn = document.querySelector(".prev-date-btn");
    prevBtn.addEventListener('click', prev);

    // NEXT MONTH BUTTON
    let nextBtn = document.querySelector(".next-date-btn");
    nextBtn.addEventListener('click', next);

    // JUMP HEADER BUTTONS
    let monthJumpBtn = document.querySelectorAll(".month-btn");
    monthJumpBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            let monthValue = btn.getAttribute("value");
            jump(monthValue, year);
        });
    });
    let yearJumpBtn = document.querySelectorAll(".year-btn");
    yearJumpBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            let yearValue = btn.getAttribute("value");
            jump(month, yearValue);
        });
    });

    // RESIZE WINDOW FOR RESPONSIVENESS
    window.addEventListener('resize', windowWidth);
}

// Function to goto next month
function next() {
    // Increment the month
    currDate.setMonth(currDate.getMonth() + 1);
    updateDateGlobals();
    displayCalendar();
}

// Function to goto previous month
function prev() {
    // Decrement the month
    currDate.setMonth(currDate.getMonth() - 1);
    updateDateGlobals();
    displayCalendar();
}


// Function to go back to today's month when clicking the calendar button
function calendarButton() {
    currDate = new Date();
    updateDateGlobals();
    displayCalendar();
}

/**
 * Adds task to task list upon "Add Task" button click.
 */
function addTask() {
    const taskList = document.querySelector(".task-container");
    const task = document.createElement("li");
    task.setAttribute("class", "task");
    task.insertAdjacentHTML("beforeend", `
        <div class="check-input-wrap">
            <button id="task1" class="task-checkbox"></button>
            <div contenteditable="true" class="task-input" placeholder="Add a task..." onkeypress="return this.innerText.length <= 180;"></div>
        </div>
        <div class="color-buttons">
            <button id="purple" class="color-button"></button>
            <button id="green" class="color-button"></button>
            <button id="blue" class="color-button"></button>
            <button id="pink" class="color-button"></button>
            <button id="grey" class="color-button"></button>
        </div>
        <img class="fas fa-trash-alt" src="../icons/trash-icon.svg" alt="Remove">
    `);
    task.querySelector(".task-input").addEventListener("input", saveCompleted)


    taskList.append(task);

    // listener to stop editing when user presses enter
    const task_name = task.querySelector(".task-input");
    task_name.addEventListener('keydown', function (event) {
        if (event.key == 'Enter') {
            if (!event.shiftKey) {
                // Shift+Enter pressed, insert a line break
                // Enter pressed, end editing
                event.preventDefault(); // Prevent default behavior of Enter key
                task_name.blur(); // Remove focus from the element
                //li.classList.remove('active');
            }
        }
    });

    // Auto click into the task name text box
    setTimeout(() => {
        task_name.focus();
        const selection = document.getSelection();
        if (selection.rangeCount > 0) {
            selection.collapseToEnd();
        }
    }, 0);

    // add functionality to task buttons
    taskButtonsFunctionality(task);

    return task;
}

/**
 * Adds button functionality to task upon creation
 * @param {Task Node} task - the task to have functionality
 */
function taskButtonsFunctionality(task) {

    /* Implement color changing functionality */
    const colorBtns = task.querySelectorAll(".color-button");
    console.log(colorBtns);
    colorBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            let color;
            switch (btn.id) {
                case "purple":
                    color = "#C380CC";
                    break;
                case "green":
                    color = "#91DC79";
                    break;
                case "blue":
                    color = "#6BB1D9";
                    break;
                case "pink":
                    color = "#EEBAE9";
                    break;
                default:
                    color = "var(--main-color)";
            }
            task.style['background-color'] = color;
            saveCompleted();
            saveTasks();
        });
    });

    /* Trash icon delete functionality */
    const deleteIcon = task.querySelector(".fas");
    deleteIcon.addEventListener("click", () => {
        task.remove();
    });

    /* Checkbox move to Completed Tasks functionality */
    const checkbox = task.querySelector(".task-checkbox");
    checkbox.addEventListener('click', function () {
        // Add or remove completed from class name
        // Find closest li item (task)

        if (task.className.includes('complete')) {
            task.classList.remove('complete');
            const taskContainer = document.querySelector('.task-container');
            taskContainer.appendChild(task);
            task.addEventListener("blur", saveTasks);
            saveCompleted();
            saveTasks();
        }
        else {
            task.classList.add('complete');
            const completedTaskContainer = document.querySelector('.completed-task-container');
            completedTaskContainer.appendChild(task);
            saveCompleted();
            saveTasks();
        }
    });
}

function taskColor() {
    // Get all elements with class .task-item
    const taskItems = document.querySelectorAll('.task-item');
    // Loop through each task item and assign a random color
    taskItems.forEach(taskItem => {
        // Generate a random color
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

        // Set the color as the value of --task-color for this task item
        taskItem.style.setProperty('--task-color', randomColor);
    });
}

// Function to display the calendar
function displayCalendar() {
    // Get body and clear current calendar
    let tbody = document.getElementById("tbody-calendar");
    tbody.innerHTML = "";

    // Initialize list of months
    let allMonths = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Get day of the week of first day in given month
    let currCalendarMonth = new Date(year, month, 1);
    let today = new Date();
    let dayOffset = -(currCalendarMonth.getDay());

    // Get month and year header
    let monthHeader = document.getElementById("month");
    let yearHeader = document.getElementById("year");
    monthHeader.textContent = allMonths[parseInt(month, 10)];
    yearHeader.textContent = year;

    let currDay;
    // BUILD CALENDAR
    // Loop through number of rows
    for (let i = 0; i < 6; i++) {
        // Create rows
        let row = document.createElement("tr");

        // Loop through number of columns
        for (let j = 0; j < 7; j++) {
            // Create data for each table cell in the row
            let cellData = document.createElement("td");

            // Create span for cell number
            let cellNum = document.createElement('span');

            // Add offset to first date in calendar
            if (i === 0 && j === 0) {
                currCalendarMonth.setDate(currCalendarMonth.getDate() + dayOffset);
                currDay = currCalendarMonth.getDate();
            }
            // Increment date by one
            else {
                currCalendarMonth.setDate(currCalendarMonth.getDate() + 1);
                currDay = currCalendarMonth.getDate();
            }
            // Add number and class to cellNum
            cellNum.textContent = currDay;
            cellNum.className = "cell-date";
            let cellDate = new Date(currCalendarMonth);

            // If current month
            if (currCalendarMonth.getMonth() === currDate.getMonth()) {
                cellData.classList.add("curr-month-date-num");
            }
            // If other month
            else {
                cellData.classList.add("other-month-date-num");
            }

            // If cell is today
            if (currCalendarMonth.toDateString() === today.toDateString()) {
                cellData.classList.add("current-date");
            }
            // If cell is in the past
            else if (currCalendarMonth < today) {
                cellData.classList.add("past-date");
            }
            // If cell is in the future
            else {
                cellData.classList.add("future-date");
            }

            // Add cell number to calendar cell
            cellData.appendChild(cellNum);

            if (cellDate <= today) {
                loadCellDataTest(cellData, currCalendarMonth);
                // loadCellData(cellData, currCalendarMonth);
            }
            // Append new cell to row
            row.appendChild(cellData);
        }
        // Append row to table
        tbody.appendChild(row);
    }

    // Add taskcolor to calendar cells
    taskColor();
    // Change the header if the window size is too small
    windowWidth();

    // Get the width of month and align the year 
    let monthWidth = document.getElementById('month-dropdown').offsetWidth;
    document.getElementById('year-dropdown').style.left = monthWidth + 5 + 'px';
}

// function loadCellDataTest(cellData, currCalendarMonth){
//     // Add sentiment icon
//     let sentimentIcon = document.createElement("img");
//     sentimentIcon.src = "./icons/5overjoyed.png"; 
//     sentimentIcon.alt = "sentiment icon";
//     sentimentIcon.className = "sentiment-icon";
//     // Append sentiment icon to new cell
//     cellData.appendChild(sentimentIcon);

//     // Add productivity icon
//     let productivityIcon = document.createElement("img");
//     productivityIcon.src = "./icons/5overjoyed.png"; 
//     productivityIcon.alt = "productivity icon";
//     productivityIcon.className = "productivity-icon";
//     // Append sentiment icon to new cell
//     cellData.appendChild(productivityIcon);

//     // Add tasklist in calendar cell
//     // Create tasklist div
//     let taskDiv = document.createElement("div");
//     taskDiv.className = "task-div";
//     // Create unordered list
//     let taskList = document.createElement("ul");
//     taskList.className = "task-ul";
//     // first task
//     let task1 = document.createElement("li");
//     task1.textContent = "I am the first task";
//     task1.className = "task-item";
//     taskList.appendChild(task1);
//     // second task
//     let task2 = document.createElement("li");
//     task2.textContent = "I am the second task";
//     task2.className = "task-item";
//     taskList.appendChild(task2);

//     // extra tasks
//     let taskExtra = document.createElement("li");
//     taskExtra.textContent = "5+";               // Change with #Tasks-2
//     taskExtra.className = "task-indicator";
//     taskList.appendChild(taskExtra);

//     // Append taskList to task div;
//     taskDiv.appendChild(taskList);
//     // Append tasklist div to new cell
//     cellData.appendChild(taskDiv);


//     // Create buttons that link to speciic homepage and extract selected date
//     let aLink = document.createElement("a");
//     let dayLink = currCalendarMonth.getDate();
//     let monthLink = currCalendarMonth.getMonth();
//     let yearLink = currCalendarMonth.getFullYear()

//     // Query is in format ?date=month-day-year
//     aLink.href = `../homepage/homepage.html?date=${monthLink}-${dayLink}-${yearLink}`;
//     aLink.className = "a-link";
//     cellData.appendChild(aLink);
// }

function loadCellDataTest(cellData, currCalendarMonth) {
    let journals = getJournal();
    let dateText = currCalendarMonth.toLocaleDateString();

    let rating = loadFromStorage(journals, dateText, "rating");
    let productivity = loadFromStorage(journals, dateText, "productivity");
    let tasks = loadFromStorage(journals, dateText, "completedTasks");

    if (rating != null) {
        // Add sentiment icon
        let sentimentIcon = document.createElement("img");
        sentimentIcon.src = `../icons/${RATING_FILES_NAMES[rating - 1]}`;
        sentimentIcon.alt = "sentiment icon";
        sentimentIcon.className = "sentiment-icon";
        // Append sentiment icon to new cell
        cellData.appendChild(sentimentIcon);
    }

    if (productivity != null) {
        // Add productivity icon
        let productivityIcon = document.createElement("img");
        productivityIcon.src = `../icons/${PRODUCTIVITY_FILES_NAMES[productivity - 1 - 5]}`;
        productivityIcon.alt = "productivity icon";
        productivityIcon.className = "productivity-icon";
        // Append sentiment icon to new cell
        cellData.appendChild(productivityIcon);
    }

    // Add tasklist in calendar cell
    // Create tasklist div
    let taskDiv = document.createElement("div");
    taskDiv.className = "task-div";
    // Create unordered list
    let taskList = document.createElement("ul");
    taskList.className = "task-ul";

    if (tasks != null) {
        for (let i = 0; i < tasks.length && i < DISPLAY_TASK_COUNT; i++) {
            let taskItem = document.createElement("li");
            taskItem.textContent = tasks[i]["text"];
            taskItem.className = "task-item";
            taskItem.style.setProperty('--task-color', tasks[i]["color"]);
            taskList.appendChild(taskItem);
        }

        if (tasks.length > DISPLAY_TASK_COUNT) {
            // extra tasks
            let taskExtra = document.createElement("li");
            taskExtra.textContent = `${tasks.length - DISPLAY_TASK_COUNT} more tasks`;
            taskExtra.className = "task-indicator";
            taskList.appendChild(taskExtra);
        }
    }

    // Append taskList to task div;
    taskDiv.appendChild(taskList);
    // Append tasklist div to new cell
    cellData.appendChild(taskDiv);


    // Create buttons that link to speciic homepage and extract selected date
    let aLink = document.createElement("a");
    let dayLink = currCalendarMonth.getDate();
    let monthLink = currCalendarMonth.getMonth();
    let yearLink = currCalendarMonth.getFullYear()

    // Query is in format ?date=month-day-year
    aLink.href = `../homepage/homepage.html?date=${monthLink}-${dayLink}-${yearLink}`;
    aLink.className = "a-link";
    cellData.appendChild(aLink);
}

// Generate dropdown year range
function displayJump(startYear, endYear) {
    // YEARS
    let yearDropdown = document.getElementById("year-dropdown")

    // Loop through year range and append to list
    for (let yr = startYear; yr < endYear + 1; yr++) {
        let yearJump = document.createElement("button");
        yearJump.value = yr;
        yearJump.textContent = yr;
        yearJump.className = "year-btn";
        yearDropdown.appendChild(yearJump);

    }

    // MONTHS
    let allMonths = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let monthDropdown = document.getElementById("month-dropdown")
    // Loop through months and append to list
    for (let mnth = 0; mnth < 12; mnth++) {
        let monthJump = document.createElement("button");
        monthJump.value = mnth;
        monthJump.textContent = allMonths[parseInt(mnth, 10)];
        monthJump.className = "month-btn";
        monthDropdown.appendChild(monthJump);
    }
}

// Function to jump to a specific month and year
function jump(mnth, yr) {
    currDate = new Date(yr, mnth)
    updateDateGlobals();
    displayCalendar();
}

function calendarHeader() {
    // Initialize list of days of the week
    let allDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Header of Days of the week
    let thead = document.getElementById("thead-weekheadings");
    let headerRow = document.createElement("tr");

    // Loop through allDays list and append day of week to row
    for (let dow of allDays) {
        let headerData = document.createElement("th");
        headerData.textContent = dow;
        headerRow.appendChild(headerData);
    }
    thead.appendChild(headerRow);
}


function taskColor() {
    // // Get all elements with class .task-item
    // const taskItems = document.querySelectorAll('.task-item');
    // // Loop through each task item and assign a random color
    // taskItems.forEach(taskItem => {
    //     // Generate a random color
    //     const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);

    //     // Set the color as the value of --task-color for this task item
    //     taskItem.style.setProperty('--task-color', randomColor);
    // });
}

// Resize header if width of window decreases
function windowWidth() {
    if (window.innerWidth < 920) {
        // Initialize list of abbreviated months
        let allMonths = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
        ];

        let monthHeader = document.getElementById("month");
        monthHeader.textContent = allMonths[parseInt(month, 10)];
    }
    else {
        // Initialize list of months
        let allMonths = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let monthHeader = document.getElementById("month");
        monthHeader.textContent = allMonths[parseInt(month, 10)];
    }

    // Get the width of month and align the year 
    let monthWidth = document.getElementById('month-dropdown').offsetWidth;
    document.getElementById('year-dropdown').style.left = monthWidth + 5 + 'px';
}

// /**
//  * Save journal entry to local storage
//  * 
//  * @param {string} data - journal entry text in parsed json format
//  * @param {string} dateText - date of the journal entry in locale date string format
//  * @param {string} key - key to store the value under
//  * @param {string} value - value to store
//  * 
//  */
// function saveToStorage(data, dateText, key, value) {
//     if (!(dateText in data)) {
//         data[dateText] = {}
//     }
//     data[dateText][key] = value;
// }

/**
 * Load journal entry from local storage
 * 
 * @param {string} data - journal entry text in parsed json format
 * @param {string} dateText - date of the journal entry in locale date string format
 * @param {string} key - key to get the value from
 */
function loadFromStorage(data, dateText, key) {
    if (!(dateText in data)) {
        return;
    }
    return data[dateText][key];
}

/**
 * Get journal entry from local storage
 * 
 * @returns {string} journal entry text in parsed json format
 */
function getJournal() {
    let data = JSON.parse(localStorage.getItem("journals"))
    if (data == null) {
        data = {}
    }
    return data
    // let returnVal = {
    //     "5/30/2024": {
    //         "rating": 5,
    //         "productivity": 6,
    //         "completedTasks": [
    //             {
    //                 "text": "Eat Food",
    //                 "color": "#FF0000"
    //             },
    //             {
    //                 "text": "Sleep",
    //                 "color": "#00FF00"
    //             },
    //             {
    //                 "text": "Code",
    //                 "color": "#0000FF"
    //             }
    //         ]
    //     },
    //     "5/31/2024": {
    //         "rating": 4,
    //         "productivity": 8,
    //         "completedTasks": [
    //             {
    //                 "text": "Fish",
    //                 "color": "#000000"
    //             },
    //             {
    //                 "text": "Blub",
    //                 "color": "#0000FF"
    //             }
    //         ]
    //     }
    // };
    // return returnVal;
}



/**
 * Save tasks to local storage
 */
function saveTasks() {
    console.log("saving tasks")
    let tasks = [];
    document.querySelectorAll('.task-container li').forEach(task => {
        //let checkbox = task.querySelector('input[type="task-checkbox"]');
        let taskName = task.querySelector('.task-input').textContent;
        let taskColor = task.style['background-color']
        tasks.push({
            text: taskName,
            color: taskColor,
        });
    });
    console.log(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 * Get tasks from local storage
 *
 * @returns {string} tasks in parsed json format or empty array if no tasks
 */
function getTasks() {
    let storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
}

/**
 * Load tasks from local storage
 */
function loadTasks() {
    let tasks = getTasks();
    if (tasks.length > 0) {
        tasks.forEach(task => {
            let curLi = addTask();
            curLi.querySelector(".task-input").textContent = task['text']
            curLi.style['background-color'] = task['color']
            //curLi.querySelector('input[type="checkbox"]').checked = task['checked']
        });
    }

}

/**
 * Saves the completed tasks per day
 */
function saveCompleted() {
    console.log("saving completed tasks");
    let data = getJournal();
    let completedTask = [];
    dateText = new Date(date.textContent).toLocaleDateString();
    document.querySelectorAll('.completed-task-container li').forEach(completedTaskElement => {
        let taskName = completedTaskElement.querySelector('.task-input').textContent;
        let taskColor = completedTaskElement.style['background-color']
        completedTask.push({
            text: taskName,
            color: taskColor,
        });
    });
    saveToStorage(data, dateText, "completedTasks", completedTask);
    localStorage.setItem("journals", JSON.stringify(data));
}

function getCompleted() {
    let data = getJournal();
    let dateText = new Date(date.textContent).toLocaleDateString();
    let storedTasks = loadFromStorage(data, dateText, "completedTasks");
    return storedTasks ? storedTasks : [];
}

/**
 * Load tasks from local storage
 */
function loadCompleted() {
    let tasks2 = getCompleted();
    if (tasks2.length > 0) {
        tasks2.forEach(task => {
            let curLi = addTask();
            completedTasks.appendChild(curLi);
            curLi.querySelector(".task-input").textContent = task['text']
            curLi.style['background-color'] = task['color']
            curLi.classList.add('complete')
            //curLi.querySelector('input[type="checkbox"]').checked = task['checked']
        });
    }
}

function unselectAllCompleted() {
    let tasks = [];
    document.querySelectorAll('.completed-task-container li').forEach(task => {
        //let checkbox = task.querySelector('input[type="task-checkbox"]');
        task.remove();
    });
}

const tasks = document.querySelector(".task-container");
tasks.addEventListener("blur", saveTasks)
tasks.addEventListener("change", saveTasks)
tasks.addEventListener("blur", saveCompleted)
tasks.addEventListener("change", saveCompleted)