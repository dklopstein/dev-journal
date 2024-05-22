window.addEventListener('DOMContentLoaded', init);

/**
 * Initializes current date heading
 * 
 * @returns {undefined} Nothing
 */
function init() {
    getDate('current-date');
}

/**
 * Displays the current date in a specified HTML container.
 * The date is formatted in a long format with the day of the week, 
 * month name, day, and year.
 * 
 * @param {string} container_id - ID of the HTML container where the date will be displayed
 */
function getDate(container_id) {
    // Get the current date
    let currentDate = new Date();

    // Format the date (e.g., "May 8, 2024")
    let formattedDate = currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Display the date in the designated container
    const dateContainer = document.getElementById(container_id);
    dateContainer.textContent = formattedDate;
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
}


//------------------------------------------

const journal = document.getElementById("journal-text");
const date = document.getElementById("current-date");

window.onload = function() {
    loadJournal()
}

window.onbeforeunload = function() {
    saveJournal()
}

// Save every 30 seconds
// var saveInterval = setInterval(function(){
//     saveJournal()
//     console.log("Saved")
// }, 30000)

function saveJournal() { 
    let data = getJournal()
    // change date format from Wednesday, May 22, 2024 to 2024-05-22
    let dateText = new Date(date.textContent).toLocaleDateString();
    data[dateText] = {
        contents: journal.value
    }
    console.log(data)
    localStorage.setItem("journals", JSON.stringify(data))
}

function getJournal() {
    let data = JSON.parse(localStorage.getItem("journals"))
    if (data == null) {
        data = {}
    }
    return data
}

function loadJournal() {
    let data = getJournal()
    let dateText = new Date(date.textContent).toLocaleDateString();
    if (data[dateText] != null) {
        journal.value = data[dateText].contents
    } else {
        journal.value = ""
    }
    console.log(data)
}

// date.addEventListener("change", loadJournal)

journal.addEventListener("blur", saveJournal)