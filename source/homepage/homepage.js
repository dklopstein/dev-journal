window.addEventListener('DOMContentLoaded', init);

function init() {
    getDate('current-date')
}

function getDate(container_id) {
    // Get the current date
    const currentDate = new Date();

    // Format the date (e.g., "May 8, 2024")
    const formattedDate = currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Display the date in the designated container
    const dateContainer = document.getElementById(container_id);
    dateContainer.textContent = formattedDate;
}