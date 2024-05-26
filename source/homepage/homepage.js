const DEBUG = true;

function _log(msg) {
    if (DEBUG) {
        console.log(msg);
    }
}

window.addEventListener('DOMContentLoaded', init);

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
    const addTaskBtn = document.querySelector("#addbutton");
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
    unselectAllWidgets();
    loadAll();
}

/**
 * Updates global currDate to the previous date and updates interface
 */
function prevDate() {
    currDate.setDate(currDate.getDate() - 1);
    displayDate(formatDate(currDate));
    unselectAllWidgets();
    loadAll();
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
        saveWidgets(buttonIndex);
    }
    else {
        const buttons = document.querySelectorAll('.feelings img');
        buttons.forEach(button => {
            button.classList.remove('active');
        });
        const selection = document.querySelector(`.rating-widget .feelings button:nth-child(${buttonIndex}) img`);
        selection.classList.add('active');
        saveWidgets(buttonIndex);
    }
}

/**
 * Unselects all widgets by removing the active property from their classnames
 */
function unselectAllWidgets() {
    const buttons = document.querySelectorAll('.feelings img');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    const buttons2 = document.querySelectorAll('.productiveness img');
    buttons2.forEach(button => {
        button.classList.remove('active');
    });
}

/**
 * A function to create a new task and place it in the sidebar
 */
function addTask() {
    // Create the new list item element
    const li = document.createElement('li');

    // Create and append the checkbox input
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.id = 'task' + (document.querySelectorAll('.task-checkbox').length + 1);
    li.appendChild(checkbox);

    // Create and append the strong element with the task name
    const strong = document.createElement('strong');
    strong.contentEditable = true;
    li.appendChild(strong);
    strong.textContent = 'Add Task Name...';

    // Add event listener to hide default text when user starts typing
    strong.addEventListener('click', function() {
        if (strong.textContent === 'Add Task Name...') {
            strong.textContent = ''; // Clear default text when user starts typing
        }
    });

    strong.addEventListener("blur", saveTasks);

    // Create and append the color-buttons div
    const colorButtons = document.createElement('div');
    colorButtons.className = 'color-buttons';
    li.appendChild(colorButtons);

    // List of colors
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];

    // Create and append each color button
    colors.forEach(color => {
        const button = document.createElement('button');
        button.className = 'color-button ' + color;
        colorButtons.appendChild(button);
    });

    // Create and append the trash icon
    const trashIcon = document.createElement('img');
    trashIcon.src = '../icons/trash-icon.svg';
    trashIcon.alt = 'Remove';
    trashIcon.className = 'fas fa-trash-alt';

    trashIcon.addEventListener('click', function() {
        // Find the parent <li> element of the clicked trash icon
        const listItem = trashIcon.closest('li');
            
        // Remove the <li> element from the DOM
        if (listItem) {
            listItem.remove();
        }
    });

    li.appendChild(trashIcon);

    // Append the new list item to the task list
    const taskContainer = document.getElementById('taskContainer');
    taskContainer.appendChild(li);
    saveTasks();

    return li;
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
//------------------------------------------
// Save journal entry

// Get the all relevent elements from page
const journal = document.getElementById("textarea");
const date = document.getElementById("current-date");
const tasks = document.getElementById("taskContainer");

// Load journal entry and tasks from local storage on page load
window.onload = function() {
    loadAll();
}

// Save journal entry and tasks to local storage on page unload
window.onbeforeunload = function() {
    saveJournal()
    saveTasks()
}

// const AUTO_SAVE_INTERVAL = 30000;
// Save journal entry and tasks to local storage on timer
// Save every 30 seconds
// var saveInterval = setInterval(function(){
//     saveJournal()
//     saveTasks()
//     _log("Saved")
// }, AUTO_SAVE_INTERVAL)

/**
 * Save journal entry to local storage
 * 
 * @param {string} data - journal entry text in parsed json format
 * @param {string} dateText - date of the journal entry in locale date string format
 * @param {string} key - key to store the value under
 * @param {string} value - value to store
 * 
 */
function saveToStorage(data, dateText, key, value){
    if (!(dateText in data)){
        data[dateText] = {}
    }
    data[dateText][key] = value;
}

/**
 * Load journal entry from local storage
 * 
 * @param {string} data - journal entry text in parsed json format
 * @param {string} dateText - date of the journal entry in locale date string format
 * @param {string} key - key to get the value from
 */
function loadFromStorage(data, dateText, key){
    if (!(dateText in data)){
        return;
    }
    return data[dateText][key];
}

/**
 * Save journal entry to local storage
 */
function saveJournal() { 
    let data = getJournal()
    let dateText = new Date(date.textContent).toLocaleDateString();
    saveToStorage(data, dateText, "contents", journal.value)
    _log(data)
    localStorage.setItem("journals", JSON.stringify(data))
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
}

/**
 * Load journal entry from local storage
 */
function loadJournal() {
    let data = getJournal()
    let dateText = new Date(date.textContent).toLocaleDateString();
    journal.value = loadFromStorage(data, dateText, "contents") || "";
    _log(data)
}

/**
 * Save tasks to local storage
 */
function saveTasks() {
    let tasks = [];
    document.querySelectorAll('#taskContainer li').forEach(task => {
        let checkbox = task.querySelector('input[type="checkbox"]');
        let taskName = task.querySelector('strong').textContent;
        tasks.push({
            text: taskName,
            checked: checkbox.checked  
        });
    });
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
            curLi.querySelector("strong").textContent = task['text']
            curLi.querySelector('input[type="checkbox"]').checked = task['checked']
        });
    }
}

/**
 * Save widgets to local storage
 * 
 * @param {int} value - value of the widget selected:
 * 1-5 for mental health, 6-10 for productivity
 */
function saveWidgets(value){
    let data = getJournal();
    let dateText = new Date(date.textContent).toLocaleDateString();
    if (value < 6){
        saveToStorage(data, dateText, "rating", value);
    }
    else {
        saveToStorage(data, dateText, "productivity", value);
    }
    localStorage.setItem("journals", JSON.stringify(data));
}

/**
 * Load widgets from local storage
 */
function loadWidgets() {
    let data = getJournal();
    let dateText = new Date(date.textContent).toLocaleDateString();
    let rating = loadFromStorage(data, dateText, "rating");
    let productivity = loadFromStorage(data, dateText, "productivity");
    if (rating != null){
        selectWidget(rating);
    }
    if (productivity != null){
        selectWidget(productivity);
    }
}

/**
 * Load all data from local storage
 */
function loadAll() {
    loadJournal();
    loadTasks();
    loadWidgets();
}
// Save journal entry and tasks to local storage on events
journal.addEventListener("blur", saveJournal)
tasks.addEventListener("blur", saveTasks)
tasks.addEventListener("change", saveTasks)