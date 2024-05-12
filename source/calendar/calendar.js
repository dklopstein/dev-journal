// Function to generate range of years
function generate_year_range(start, end) {
    let years = "";
    for (let year = start; year <= end; year++) {
        years += "<option value='" +
            year + "'>" + year + "</option>";
    }
    return years;
}
 
// Initialize Date variables
today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");

createYear = generate_year_range(currentYear-10, currentYear+10);
 
document.getElementById("year").innerHTML = createYear;
 
let calendar = document.getElementById("calendar");
 
let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
let days = [
    "Sun", "Mon", "Tue", "Wed",
    "Thu", "Fri", "Sat"];
 
$dataHead = "<tr>";
for (dhead in days) {
    $dataHead += "<th data-days='" +
        days[dhead] + "'>" +
        days[dhead] + "</th>";
}
$dataHead += "</tr>";
 
document.getElementById("thead-month").innerHTML = $dataHead;
 
monthAndYear =
    document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);
 
// Function to navigate to the next month
function next() {
    currentYear = currentMonth === 11 ?
        currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}
 
// Function to navigate to the previous month
function previous() {
    currentYear = currentMonth === 0 ?
        currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ?
        11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}
 
// Function to jump to a specific month and year
function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}
 
// Function to display the calendar
function showCalendar(month, year) {
    let firstDay = new Date(year, month, 1).getDay();
    tbl = document.getElementById("calendar-body");
    tbl.innerHTML = "";
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // Calculate previous month and year
    let previousMonth = month - 1;
    let previousYear = year;
    if (previousMonth < 0) {
        previousMonth = 11;
        previousYear -= 1;
    }

    // Calculate the number of days in previous month
    let daysInPreviousMonth = daysInMonth(previousMonth, previousYear);

    let date = 1;
    let cell, cellText;

    // Loop to create the rows
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            cell = document.createElement("td");
            if (i === 0 && j < firstDay) {
                // Fill the last few days of the previous month
                let prevMonthDate = daysInPreviousMonth - (firstDay - j) + 1;
                cellText = document.createTextNode(prevMonthDate);
                cell.className = "date-picker other-month";
            } else if (date > daysInMonth(month, year)) {
                // Fill the first few days of the next month
                let nextMonthDate = date - daysInMonth(month, year);
                cellText = document.createTextNode(nextMonthDate);
                cell.className = "date-picker other-month";
                date++;
            } else {
                cellText = document.createTextNode(date);
                cell.className = "date-picker";
                date++;
            }
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tbl.appendChild(row);
        // Break the loop when the current month is completely filled
        if (date > daysInMonth(month, year)) break;
    }
    displayReminders();
}
 
// Function to get the number of days in a month
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}
 
// Call the showCalendar function initially to display the calendar
showCalendar(currentMonth, currentYear);

function bla()

{
    return 1;
}