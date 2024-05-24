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
    const currentDate = new Date();

    // Format the date (e.g., "May 8, 2024")
    const formattedDate = currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

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

// Add event listener to remove active and blur strong when you click outside of task
document.addEventListener('click', function(event) {
    const currElement = document.getElementsByClassName('')

    if (!li.contains(event.target)) {
        strong.blur();
    }
});

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
    strong.textContent = '';

    // Add event listener to add active to class name when editing
    strong.addEventListener('focus', function(event) {
        li.classList.add('active');
    });

    // Add event listener to stop editing when user presses enter
    strong.addEventListener('keydown', function(event) {
        if (event.key == 'Enter') {
            if (!event.shiftKey) {
                // Shift+Enter pressed, insert a line break
                // Enter pressed, end editing
                event.preventDefault(); // Prevent default behavior of Enter key
                strong.blur(); // Remove focus from the element
                li.classList.remove('active');
            }
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
    
    // Auto click into the task name text box
    strong.focus();

    document.getSelection().collapseToEnd();
}