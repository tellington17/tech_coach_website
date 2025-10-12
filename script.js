// Dynamically load the header into the #header div
document.addEventListener('DOMContentLoaded', () => {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            // Insert the fetched header HTML into the page
            document.getElementById('header').innerHTML = data;

            // Attach navbar behavior after header loads
            const navToggle = document.getElementById('nav-toggle');
            const navMenu = document.getElementById('nav-menu');

            if (navToggle && navMenu) {
                navToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('open');
                });
            }
        })
        .catch(error => console.error('Error loading header:', error));
});