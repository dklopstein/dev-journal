window.addEventListener('DOMContentLoaded', init);

// Get current date globals
var currDate = new Date();
var month = currDate.getMonth();
var year = currDate.getFullYear();

/**
 * Updates the global date variables
 */
function updateDateGlobals() {
    month = currDate.getMonth();
    year = currDate.getFullYear();
}

/**
 * Initializes and displays calendar when page loads
 */
function init(){
    // Initiaze the jump buttons
    displayJump(year-6,year+5);

    // Initially display the calendar, calendar header, and task colors
    calendarHeader();
    displayCalendar();

    // Initialize the buttons 
    initButtons();
}

/**
 * Initializes functionality of buttons
 */
function initButtons(){

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

    // TASK LIST BUTTONS
    const addTaskBtn = document.querySelector(".add-task-btn");
    addTaskBtn.addEventListener("click", addTask);

    // RESIZE WINDOW FOR RESPONSIVENESS
    window.addEventListener('resize', windowWidth);

    // ARROW KEY EVENT LISTENERS
    window.addEventListener('keydown', function(event) {
        if (event.key === "ArrowLeft") {
            prev();
        } else if (event.key === "ArrowRight") {
            next();
        }
    });
}

/**
 * Updates the global currDate to the next date and displays the next month
 */
function next(){
    // Increment the month
    currDate.setMonth(currDate.getMonth() + 1);
    updateDateGlobals();
    displayCalendar();
}

/**
 * Updates the global currDate to the previous date and displays the previous month
 */
function prev(){
    // Decrement the month
    currDate.setMonth(currDate.getMonth() - 1);
    updateDateGlobals();
    displayCalendar();
}

/**
 * Displays the calendar and its data
 */
function displayCalendar(){
    // Get body and clear current calendar
    let tbody = document.getElementById("tbody-calendar");
    tbody.innerHTML = "";

    // Initialize list of months
    let allMonths = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
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
            if (i === 0 && j === 0){
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
                
                // extra tasks
                let taskExtra = document.createElement("li");
                taskExtra.textContent = "5+";               // Change with #Tasks-2
                taskExtra.className = "task-indicator";
                taskList.appendChild(taskExtra);

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

/**
 * Generates dropdown menu year range
 * @param {number} startYear - year for the range to start
 * @param {number} endYear - year for the range to end
 */
function displayJump(startYear, endYear) {
    // YEARS
    let yearDropdown = document.getElementById("year-dropdown")

    // Loop through year range and append to list
    for (let yr = startYear; yr < endYear+1; yr++) {
        let yearJump = document.createElement("button");
        yearJump.value = yr;
        yearJump.textContent = yr;
        yearJump.className = "year-btn";
        yearDropdown.appendChild(yearJump);
        
    }
    // MONTHS
    let allMonths = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];
    let monthDropdown = document.getElementById("month-dropdown")
    // Loop through months and append to list
    for (let mnth = 0; mnth < 12; mnth++) {
        let monthJump = document.createElement("button");
        monthJump.value = mnth;
        monthJump.textContent = allMonths[parseInt(mnth,10)];
        monthJump.className = "month-btn";
        monthDropdown.appendChild(monthJump);
    }
}

/**
 * Function to jump to a specific month and year
 * @param {number} mnth - month to jump to
 * @param {number} yr - year to jump to
 */
function jump(mnth, yr) {
    currDate = new Date(yr, mnth)
    updateDateGlobals();
    displayCalendar();
}

/**
 * Creates header of the calendar
 */
function calendarHeader(){
    // Initialize list of days of the week
    let allDays = ["Sun", "Mon", "Tue", "Wed","Thu", "Fri", "Sat"];

    // Header of Days of the week
    let thead = document.getElementById("thead-weekheadings");
    let headerRow = document.createElement("tr");

    // Loop through allDays list and append day of week to row
    for (let dow of allDays){
        let headerData = document.createElement("th");
        headerData.textContent = dow;
        headerRow.appendChild(headerData);
    }
    thead.appendChild(headerRow);
}

/**
 * Assigns different colors to tasks
 */
function taskColor(){
    // Get all elements with class .task-item
    const taskItems = document.querySelectorAll('.task-item');
    // Loop through each task item and assign a random color
    taskItems.forEach(taskItem => {
        // Generate a random color
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        // Set the color as the value of --task-color for this task item
        taskItem.style.setProperty('--task-color', randomColor);
    });
}

/**
 * Resizes windows and changes display based on window size
 */
function windowWidth() {
    if (window.innerWidth < 920) {
        // Initialize list of abbreviated months
        let allMonths = [
            "Jan","Feb","Mar","Apr","May","Jun",
            "Jul","Aug","Sept","Oct","Nov","Dec"
        ];

        let monthHeader = document.getElementById("month");
        monthHeader.textContent = allMonths[parseInt(month, 10)];
    }
    else{
        // Initialize list of months
        let allMonths = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
        ];
        let monthHeader = document.getElementById("month");
        monthHeader.textContent = allMonths[parseInt(month, 10)];
    }

    // Get the width of month and align the year 
    let monthWidth = document.getElementById('month-dropdown').offsetWidth;
    document.getElementById('year-dropdown').style.left = monthWidth + 5 + 'px';
  }


/**
 * Adds task to task list upon "Add Task" button click.
 */
async function addTask() {
    const taskList = document.querySelector(".task-container");
    const task = document.createElement("li");
    task.setAttribute("class", "task");
    await task.insertAdjacentHTML("beforeend", `
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
    taskList.append(task);

    // listener to stop editing when user presses enter
    const task_name = task.querySelector(".task-input");
    task_name.addEventListener('keydown', function(event) {
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
        document.getSelection().collapseToEnd();
    }, 0);

    // add functionality to task buttons
    taskButtonsFunctionality(task);
}

/**
 * Adds color changing functionality to task; called within addTask
 * @param {Task Node} task 
 */
function taskButtonsFunctionality(task) {

    /* Implement color changing functionality */
    const colorBtns = task.querySelectorAll(".color-button");
    console.log(colorBtns);
    colorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
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
        });
    });

    /* Trash icon delete functionality */
    const deleteIcon = task.querySelector(".fas");
    deleteIcon.addEventListener("click", () => {
        task.remove();
    });

    /* Checkbox move to Completed Tasks functionality */
    const checkbox = task.querySelector(".task-checkbox");
    checkbox.addEventListener('click', function() {
        // Add or remove completed from class name
        // Find closest li item (task)

        if (task.className.includes('complete')) {
            task.classList.remove('complete');
            const taskContainer = document.querySelector('.task-list');
            taskContainer.appendChild(task);
        }
        else {
            task.classList.add('complete');
            const completedTaskContainer = document.querySelector('.completed-task-container');
            completedTaskContainer.appendChild(task);
        }
    });
}