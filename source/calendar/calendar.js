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
function init(){
    // Initially display the jump button
    displayJump(year-5,year+5);

    // Initially display the calendar, calendar header, and task colors
    calendarHeader();
    displayCalendar();
    taskColor();

    // Initialize the buttons 
    initButtons();
}


// FUNCTIONS

function initButtons(){

    // PREVIOUS BUTTON
    let prevBtn = document.getElementById("previous");
    prevBtn.addEventListener('click', prev);

    // NEXT BUTTON
    let nextBtn = document.getElementById("next");
    nextBtn.addEventListener('click', next);

    // CALENDAR BUTTON
    let calendarBtn = document.getElementById("calendarpage");
    calendarBtn.addEventListener('click', calendarButton);

    // JUMP BUTTON
    let monthBtn = document.getElementById("month");
    monthBtn.addEventListener('change', jump);
    let yearBtn = document.getElementById("year");
    yearBtn.addEventListener('change', jump);
}

// Function to goto next month
function next(){
    // Increment the month
    currDate.setMonth(currDate.getMonth() + 1);
    updateDateGlobals();
    displayCalendar();
}

// Function to goto previous month
function prev(){
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
 
// Function to display the calendar
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
    let monthYearHeader = document.getElementById("monthYearHeader");
    monthYearHeader.textContent = allMonths[parseInt(month, 10)] + " " + year;

    // Get and update jump with current month and year
    let selectYear = document.getElementById("year");
    let selectMonth = document.getElementById("month");
    selectMonth.value = month;
    selectYear.value = year;

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


            // Add sentiment icon
            let sentimentIcon = document.createElement("img");
            sentimentIcon.src = "./icons/5overjoyed.png"; 
            sentimentIcon.alt = "sentiment icon";
            sentimentIcon.className = "sentiment-icon";
            // Append sentiment icon to new cell
            cellData.appendChild(sentimentIcon);

            // Add productivity icon
            let productivityIcon = document.createElement("img");
            productivityIcon.src = "./icons/5overjoyed.png"; 
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
            // Append new cell to row
            row.appendChild(cellData);
        }
        // Append row to table
        tbody.appendChild(row);
    }
}

// Generate dropdown year range
function displayJump(startYear, endYear) {

    // YEARS
    let yearDropdown = document.getElementById("year")
    // Loop through year range and append to list
    for (let yr = startYear; yr < endYear+1; yr++) {
        let yearJump = document.createElement("option");
        yearJump.value = yr;
        yearJump.textContent = yr;
        yearDropdown.appendChild(yearJump);
    }

    // MONTHS
    let allMonths = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];
    let monthDropdown = document.getElementById("month")
    // Loop through months and append to list
    for (let mnth = 0; mnth < 12; mnth++) {
        let monthJump = document.createElement("option");
        monthJump.value = mnth;
        monthJump.textContent = allMonths[parseInt(mnth,10)];
        monthDropdown.appendChild(monthJump);
    }
}

// Function to jump to a specific month and year
function jump() {
    let selectYear = document.getElementById("year");
    let selectMonth = document.getElementById("month");
    let jumpMonth = parseInt(selectMonth.value, 10);
    let jumpYear = parseInt(selectYear.value, 10);
    currDate = new Date(jumpYear, jumpMonth)
    updateDateGlobals();
    displayCalendar();
}

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
