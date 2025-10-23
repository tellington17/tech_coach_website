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
                // Toggle menu open/close
                navToggle.addEventListener('click', (event) => {
                    event.stopPropagation(); // Prevent click from bubbling
                    navMenu.classList.toggle('open');
                });

                // Close when clicking outside the menu or toggle
                document.addEventListener('click', (event) => {
                    if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
                        navMenu.classList.remove('open');
                    }
                });

                // Close when scrolling
                window.addEventListener('scroll', () => {
                    navMenu.classList.remove('open');
                });
            }
        })
        .catch(error => console.error('Error loading header:', error));
});

// Enable card flip for all highlight elements
document.addEventListener('click', (event) => {
    const highlight = event.target.closest('.highlight');
    if (highlight) {
        highlight.classList.toggle('flipped');
    }
});

// EmailJS form submission handling
document.addEventListener("DOMContentLoaded", function () {
    // Initialize EmailJS
    emailjs.init("DLMola9AEmeTtDNly");

    // Add form submission handler
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            emailjs.sendForm("service_byuo014", "template_ghrdyjm", this)
                .then(() => {
                    alert("Message sent successfully!");
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error("EmailJS Error:", error);
                    alert("Failed to send message. Please try again later.");
                });
        });
    }
});

// Adjust main padding based on navbar height
function adjustMainPadding() {
    const navbar = document.querySelector('.navbar');
    const main = document.querySelector('main');
    if (navbar && main) {
        const navbarHeight = navbar.offsetHeight;
        main.style.paddingTop = `${navbarHeight}px`;
    }
}

// Run on load and when the window resizes
window.addEventListener('load', adjustMainPadding);
window.addEventListener('resize', adjustMainPadding);