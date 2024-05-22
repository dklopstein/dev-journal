// Wait for window to load
window.addEventListener('DOMContentLoaded', init);

// When page loads
function init(){
    // initialize date variables
    let date = new Date();
    let currMonth = date.getMonth();
    let currYear = date.getFullYear();

    // Get Jump variables and list
    let createYearRange = gen_years(currYear-10, currYear+10); 
    document.getElementById("year").innerHTML = createYearRange;

    // Initialize list of days of the week
    let allDays = ["Sun", "Mon", "Tue", "Wed","Thu", "Fri", "Sat"];
    
    // Header of Days of the week
    let HDaysOfWeek = "<tr>";
    // Loop through allDays list
    for (day of allDays){
        HDaysOfWeek += "<th data-days='" + day + "'>" + day + "</th>";
    }
    // Close header
    HDaysOfWeek += "</tr>";
    // Add filled in day of the week header to calendar table
    document.getElementById("thead-weekheadings").innerHTML = HDaysOfWeek;

    // PREVIOUS BUTTON
    let prevBtn = document.getElementById("previous");
    prevBtn.addEventListener('click', () => { 
        prev();
    });
    // NEXT BUTTON
    let nextBtn = document.getElementById("next");
    nextBtn.addEventListener('click', () => { 
        next();
    });

    // CALENDAR BUTTON
    let calendarBtn = document.getElementById("calendarpage");
    calendarBtn.addEventListener('click', () => { 
        calendarButton();
    });

    // JUMP BUTTON
    let monthBtn = document.getElementById("month");
    monthBtn.addEventListener('click', () => { 
        jump();
    });
    let yearBtn = document.getElementById("year");
    yearBtn.addEventListener('click', () => { 
        jump();
    });

    // Initially call displayCalendar to display the calendar
    displayCalendar(currMonth, currYear);
}


// FUNCTIONS

// Function to goto next month
function next(){
    // If Dec to Jan increment year
    if (currMonth == 11){
        currYear += 1;
    }
    // Increment currMonth and go to 0 if Dec to Jan
    currMonth = (currMonth + 1) % 12;
    // Update calendar
    displayCalendar(currMonth, currYear);
}

// Function to goto previous month
function prev(){
    // Decrement currMonth
    currMonth--;
    // If Jan to Dec decrement year and set month to Dec
    if (currMonth == -1){
        currYear -= 1;
        currMonth = 11;
    }
    // Update calendar
    displayCalendar(currMonth, currYear);
}
 
// Function to jump to a specific month and year
function jump() {
    currYear = parseInt(selectYear.value);
    currMonth = parseInt(selectMonth.value);
    displayCalendar(currMonth, currYear);
}

// Function to go back to current month when clicking the calendar button
function calendarButton() {
    currMonth = date.getMonth();
    currYear = date.getFullYear();
    displayCalendar(currMonth, currYear);
}
 
// Function to display the calendar
function displayCalendar(mnth, yr){
    // Get today's date
    let date = new Date();
    
    // Initialize list of months
    let allMonths = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];

    // Get calendar day of first day in given month
    let first = new Date(yr, mnth, 1);

    // Get weekday 0-6
    let firstDay = first.getDay();

    // Get month and year header
    let monthYearHeader = document.getElementById("monthYearHeader");
    // Get body of calendar
    let tbody = document.getElementById("tbody-calendar");

    // Selected month and year
    let selectYear = document.getElementById("year");
    let selectMonth = document.getElementById("month");

    // Clear the table body
    tbody.innerHTML = "";

    //Create calendar month/year heading
    monthYearHeader.innerHTML = allMonths[mnth] + " " + yr;

    // Update jump with current month and year
    selectMonth.value = mnth;
    selectYear.value = yr;

    // Set previous month and year variables
    let prevMonth = mnth - 1;
    let prevYear = yr;
    if (mnth == 0){
        prevMonth = 11;
        prevYear = yr-1;
    }

    // Set next month and year variables
    // Set previous month and year variables
    let nextMonth = mnth + 1;
    let nextYear = yr;
    if (mnth == 11){
        nextMonth = 0;
        nextYear = yr+1;
    }

    // Intitialize current day of the current and next month
    let currMonthDay = 1;
    let nextMonthDay = 1;

    // BUILD CALENDAR
    // Loop through number of rows
    for (let i = 0; i < 6; i++) {
        // Create rows
        let row = document.createElement("tr");
    
        // Loop through number of columns
        for (let j = 0; j < 7; j++) {
            // Create data for each table cell in the row
            cell_data = document.createElement("td");

            // Fill in previous month into unfilled cells before first day of month
            if (i == 0 && j < firstDay) {
                // Calculate dates of previous month
                let prevMonthDay = daysInMonth(prevMonth, prevYear) - (firstDay - j) + 1;
                // Number of current day
                cellNum = document.createElement('span');
                cellNum.textContent = prevMonthDay;
                cellNum.className = "cell-date";

                // Add class date-num and other-month
                cell_data.className = "other-month-date-num";

                // Current cell date
                let cellDate = new Date(prevYear, prevMonth, prevMonthDay);
                // If cell is in the future
                if (cellDate > date) {
                    cell_data.classList.add("future-date");
                }

            } 
            // Fill next month into unfilled cells after last day of month
            else if (currMonthDay > daysInMonth(mnth, yr)) {
                // Number of current day
                cellNum = document.createElement('span');
                cellNum.textContent = nextMonthDay;
                // Add class date-num and other-month
                cell_data.className = "other-month-date-num";
                cellNum.className = "cell-date";

                // Current cell date
                let cellDate = new Date(nextYear, nextMonth, nextMonthDay);
                // If cell is in the future
                if (cellDate > date) {
                    cell_data.classList.add("future-date");
                }

                // Increment next month day counter
                nextMonthDay++;

            } 
            // Fill in days of current month
            else {
                // Number of current day
            //    cellNum = document.createTextNode(currMonthDay);
                cellNum = document.createElement('span');
                cellNum.textContent = currMonthDay;
                cellNum.className = "cell-date";
                // Add class date-num
                cell_data.className = "curr-month-date-num";

                // Current cell date
                let cellDate = new Date(yr, mnth, currMonthDay);
                // If cell is in the future
                if (cellDate > date) {
                    cell_data.classList.add("future-date");
                }
                // If cell is today
                else if (cellDate.toDateString() === date.toDateString()) {
                    cell_data.classList.add("current-date");
                }

                // Increment curr month day counter
                currMonthDay++;
            }
            
            // Append cell number to new cell
            cell_data.appendChild(cellNum);

            // Add sentiment icon
            let sentimentIcon = document.createElement("img");
            sentimentIcon.src = "./icons/5overjoyed.png"; 
            sentimentIcon.alt = "sentiment icon";
            sentimentIcon.className = "sentiment-icon";
            // Append sentiment icon to new cell
            cell_data.appendChild(sentimentIcon);

            // Add productivity icon
            let productivityIcon = document.createElement("img");
            productivityIcon.src = "./icons/5overjoyed.png"; 
            productivityIcon.alt = "productivity icon";
            productivityIcon.className = "productivity-icon";
            // Append sentiment icon to new cell
            cell_data.appendChild(productivityIcon);

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
            cell_data.appendChild(taskDiv);

            // Append new cell to row
            row.appendChild(cell_data);
        }
        // Append row to table
        tbody.appendChild(row);
    }
}

// Get number of days in a given month
function daysInMonth(mnth, yr){
    // Get last date of current month
    var lastDay= new Date(yr, ((mnth+1)%12) , 0);
    // Return max day count
    return lastDay.getDate();
}

// Generate dropdown year range
function gen_years(startYear, endYear) {
    // Initialize empty string
    let yearList = "";
    // Loop through year range
    for (let yr = startYear; yr < endYear+1; yr++) {
        // Concatenate the year
        yearList += "<option value='" + yr + "'>" + yr + "</option>";
    }
    // Return concatenated list
    return yearList;
}
