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
 * @param {string} container_id - The ID of the HTML container where the date will be displayed.
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